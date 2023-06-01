import { Path, StatsBlockBuilder, StatsBlockDefinitions } from '../blocks'
import { BridgeDuels, Duels, UHCDuels, MultiPVPDuelsGameMode } from '@lilithmod/unborn-hypixel/dist/statsify/models/player'
import { pattern } from '../patterns'
import { colorToCode } from '../colors'
import get from 'lodash.get'

type OmitMultiNonModeKeys<T> = Omit<T, 'titleFormatted' | 'titleLevelFormatted' | 'nextTitleLevelFormatted' | 'progression'>

export type DuelsMode =
    keyof Omit<Duels, 'pingRange' | 'coins' | 'lootChests' | 'bridge' | 'megawalls' | 'op' | 'skywars' | 'uhc'>
        | `bridge.${keyof OmitMultiNonModeKeys<BridgeDuels>}`
        | `uhc.${keyof OmitMultiNonModeKeys<UHCDuels>}`
        | `${'megawalls' | 'op' | 'skywars'}.${keyof OmitMultiNonModeKeys<MultiPVPDuelsGameMode>}`

export type DuelsPVPMode =
    keyof Omit<Duels,
        'pingRange' | 'coins' | 'lootChests'
        | 'bridge' | 'megawalls' | 'op' | 'skywars' | 'uhc'
        | 'arena' | 'bowSpleef' | 'parkour'>
    | `bridge.${keyof OmitMultiNonModeKeys<BridgeDuels>}`
    | `uhc.${keyof OmitMultiNonModeKeys<UHCDuels>}`
    | `${'megawalls' | 'op' | 'skywars'}.${keyof OmitMultiNonModeKeys<MultiPVPDuelsGameMode>}`

const duelsPVPModes: DuelsMode[] = [
    'overall', 'blitzsg', 'bow', 'boxing', 'classic', 'combo', 'nodebuff', 'sumo',
    'bridge.overall', 'bridge.solo', 'bridge.doubles', 'bridge.threes', 'bridge.fours', 'bridge.2v2v2v2', 'bridge.3v3v3v3', 'bridge.ctf',
    'uhc.overall', 'uhc.solo', 'uhc.doubles', 'uhc.fours', 'uhc.deathmatch',
    'megawalls.overall', 'megawalls.solo', 'megawalls.doubles',
    'op.overall', 'op.solo', 'op.doubles',
    'skywars.overall', 'skywars.solo', 'skywars.doubles']

export function isDuelsPVPMode(mode: DuelsMode): mode is DuelsPVPMode {
    return duelsPVPModes.includes(mode)
}

export type BridgeDuelsMode = `bridge.${keyof OmitMultiNonModeKeys<BridgeDuels>}`
export type UHCDuelsMode = `uhc.${keyof OmitMultiNonModeKeys<UHCDuels>}`

export function isBridgeDuelsMode(mode: DuelsMode): mode is BridgeDuelsMode {
    return mode.startsWith('bridge.')
}

export function isUHCDuelsMode(mode: DuelsMode): mode is UHCDuelsMode {
    return mode.startsWith('uhc.')
}

function nestedModeToMode(mode: DuelsMode): Path<Duels> {
    if (mode.startsWith('bridge.')) {
        return 'bridge'
    } else if (mode.startsWith('uhc.')) {
        return 'uhc'
    } else if (mode.startsWith('megawalls.')) {
        return 'megawalls'
    } else if (mode.startsWith('op.')) {
        return 'op'
    } else if (mode.startsWith('skywars.')) {
        return 'skywars'
    }
    return mode
}

const duelsBlocks = {
    wins: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'W',
        pattern: mode === 'overall' ? 'duelsWinsOrLosses' : 'duelsWinsOrLossesMode',
        value: `stats.duels.${mode}.wins`
    })),
    losses: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'L',
        pattern: mode === 'overall' ? 'duelsWinsOrLosses' : 'duelsWinsOrLossesMode',
        value: `stats.duels.${mode}.losses`
    })),
    wlr: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'W/L',
        pattern: 'duelsWLR',
        value: `stats.duels.${mode}.wlr`
    })),
    winstreak: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'WS',
        pattern: mode === 'overall' ? 'duelsWinstreak' : 'duelsWinstreakMode',
        value: `stats.duels.${mode}.winstreak`
    })),
    bestWinstreak: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'BWS',
        pattern: mode === 'overall' ? 'duelsWinstreak' : 'duelsWinstreakMode',
        value: `stats.duels.${mode}.bestWinstreak`
    })),
    kills: (mode: DuelsPVPMode) => (new StatsBlockBuilder({
        name: 'K',
        pattern: mode === 'overall' ? 'duelsKillsOrDeaths' : 'duelsKillsOrDeathsMode',
        value: `stats.duels.${mode}.kills`
    })),
    deaths: (mode: DuelsPVPMode) => (new StatsBlockBuilder({
        name: 'D',
        pattern: mode === 'overall' ? 'duelsKillsOrDeaths' : 'duelsKillsOrDeathsMode',
        value: `stats.duels.${mode}.deaths`
    })),
    kdr: (mode: DuelsPVPMode) => (new StatsBlockBuilder({
        name: 'KDR',
        pattern: 'duelsKDR',
        value: `stats.duels.${mode}.kdr`
    })),
    goals: (mode: BridgeDuelsMode) => (new StatsBlockBuilder({
        name: 'G',
        pattern: 'bridgeGoals',
        value: `stats.duels.${mode}.goals`
    })),
    // TODO: melee accuracy
    title: (mode: DuelsMode) => (new StatsBlockBuilder({
        name: 'Title',
        render: (player) => {
            mode = nestedModeToMode(mode) as DuelsMode
            const title = get(player.stats.duels, mode).titleFormatted
            return `${title} `
        }
    })),
    progression: (mode: DuelsMode, style: ProgressionStyle) => (new StatsBlockBuilder({
        name: 'Progression',
        render: (player, options, endOfLine) => {
            mode = nestedModeToMode(mode) as DuelsMode

            let middle = ' '
            if (style.endsWith('Arrow')) {
                middle = ' &f→ '
            } else if (style.endsWith('To')) {
                middle = ' &fto '
            }

            let str
            const stats = get(player.stats.duels, mode)
            if (style.startsWith('percentage')) {
                str = `${pattern('percentTo100', stats.progression.percent)}%${middle}${stats.nextTitleLevelFormatted}`
            } else {
                str = `&f${stats.progression.current}&7/&f${stats.progression.max}${middle}${stats.nextTitleLevelFormatted}`
            }

            if (!endOfLine) {
                if (options.commas) {
                    return str + `${colorToCode[options.blockNameColor]}, `
                } else {
                    return str + ' '
                }
            }
            if (options.commas && options.commasEndLines) {
                return str + `${colorToCode[options.blockNameColor]},`
            }
            return str + ''

        }
    }))
}

export type ProgressionStyle = 'ratio' | 'ratioArrow' | 'ratioTo' | 'percentage' | 'percentageArrow' | 'percentageTo'

export default duelsBlocks