import { BedWars, BedWarsMode as StatsifyBedwarsModeModel } from '@lilithmod/unborn-hypixel/dist/statsify/models/player'
import { StatsBlockBuilder } from '../blocks'

type AllowedFieldsWithType<Obj, Type> = {
    [K in keyof Obj]: Obj[K] extends Type ? K : never
};

export type ExtractFieldsOfType<Obj, Type> = AllowedFieldsWithType<Obj, Type>[keyof Obj]

export type FindModesWithField<Obj, Field extends string> = ExtractFieldsOfType<Obj, {
    [key in Field]: any
}>

// type BedWarsMode = keyof Omit<BedWars, 'coins' | 'lootChests' | 'exp' | 'level' | 'levelFormatted' | 'progression' | 'nextLevelFormatted' | 'challenges'>
export type BedWarsMode = ExtractFieldsOfType<BedWars, StatsifyBedwarsModeModel>

const bedwarsBlocks = {
    wins: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'W',
        pattern: 'bedwarsWinsOrLosses',
        value: `stats.bedwars.${mode}.wins`
    })),
    losses: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'L',
        pattern: 'bedwarsWinsOrLosses',
        value: `stats.bedwars.${mode}.losses`
    })),
    wlr: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'W/L',
        pattern: 'bedwarsWLR',
        value: `stats.bedwars.${mode}.wlr`
    })),
    kills: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'K',
        pattern: 'bedwarsKillsOrDeaths',
        value: `stats.bedwars.${mode}.kills`
    })),
    deaths: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'D',
        pattern: 'bedwarsKillsOrDeaths',
        value: `stats.bedwars.${mode}.deaths`
    })),
    kdr: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'K/D',
        pattern: 'bedwarsKDR',
        value: `stats.bedwars.${mode}.kdr`
    })),
    finalKills: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'FK',
        pattern: 'bedwarsFinalKillsOrDeaths',
        value: `stats.bedwars.${mode}.finalKills`
    })),
    finalDeaths: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'FD',
        pattern: 'bedwarsFinalKillsOrDeaths',
        value: `stats.bedwars.${mode}.finalDeaths`
    })),
    fkdr: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'FK/D',
        pattern: 'bedwarsFKDR',
        value: `stats.bedwars.${mode}.fkdr`
    })),
    bedsBroken: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'B',
        pattern: 'bedwarsBedsBrokenOrLost',
        value: `stats.bedwars.${mode}.wins`
    })),
    bedsLost: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'BL',
        pattern: 'bedwarsBedsBrokenOrLost',
        value: `stats.bedwars.${mode}.bedsLost`
    })),
    bblr: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'BB/L',
        pattern: 'bedwarsBBLR',
        value: `stats.bedwars.${mode}.bblr`
    })),
    winstreak: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'WS',
        pattern: 'bedwarsWinstreak',
        value: `stats.bedwars.${mode}.winstreak`
    })),
    gamesPlayed: (mode: BedWarsMode) => (new StatsBlockBuilder({
        name: 'GP',
        pattern: 'bedwarsWinsOrLosses',
        value: `stats.bedwars.${mode}.gamesPlayed`
    }))
}

export default bedwarsBlocks