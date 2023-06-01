import { SkyWars, SkyWarsMode as StatsifySkywarsModeModel } from '@lilithmod/unborn-hypixel/dist/statsify/models/player'
import { ExtractFieldsOfType } from './bedwars'
import { StatsBlockBuilder } from '../blocks'
import numeral from 'numeral'
import { colorToCode } from '../colors'
import { formatTime } from '../utils'


export type SkywarsMode = ExtractFieldsOfType<SkyWars, StatsifySkywarsModeModel>

const skywarsBlocks = {
    star: () => (new StatsBlockBuilder({
        name: 'STAR',
        render: (player) => {
            return player.stats.skywars.levelFormatted + ' '
        }
    })),
    playtime: () => (new StatsBlockBuilder({
        name: 'T',
        // pattern: 'skywarsPlaytime',
        value: (player) => {
            return (player.stats.skywars.overall.playtime / 3_600_000)
        },
        format: (value, options) => {
            return `&c${formatTime(value * 3_600_000, { short: true, entries: 2 })}`
        },
    })),
    corruptionChance: () => (new StatsBlockBuilder({
        name: 'C',
        value: (player) => {
            const initialChance = player.rawData.stats?.SkyWars?.angel_of_death_level ?? 0
            const angelsOffering = player.rawData.stats?.SkyWars?.angels_offering ?? 0
            const favorOfTheAngel = (player.rawData.stats?.SkyWars?.packages ?? []).includes('favor_of_the_angel') ? 1 : 0
            return initialChance + angelsOffering + favorOfTheAngel
        },
        format: (value) => {
            return `&5${value}%`
        }
    })),
    // game stats
    wins: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'W',
        pattern: 'skywarsWinsOrLosses',
        value: `stats.skywars.${mode}.wins`
    })),
    losses: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'L',
        pattern: 'skywarsWinsOrLosses',
        value: `stats.skywars.${mode}.losses`
    })),
    wlr: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'W/L',
        pattern: 'skywarsWLR',
        value: `stats.skywars.${mode}.wlr`
    })),
    kills: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'K',
        pattern: 'skywarsKillsOrDeaths',
        value: `stats.skywars.${mode}.kills`
    })),
    deaths: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'D',
        pattern: 'skywarsKillsOrDeaths',
        value: `stats.skywars.${mode}.deaths`
    })),
    kdr: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'K/D',
        pattern: 'skywarsKDR',
        value: `stats.skywars.${mode}.kdr`
    })),
    assists: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'A',
        pattern: 'skywarsAssists',
        value: `stats.skywars.${mode}.assists`
    })),
    gamesPlayed: (mode: SkywarsMode) => (new StatsBlockBuilder({
        name: 'GP',
        pattern: 'skywarsGamesPlayed',
        value: `stats.skywars.${mode}.gamesPlayed`
    })),
}

export default skywarsBlocks