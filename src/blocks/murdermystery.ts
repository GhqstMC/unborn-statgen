import {
    MurderMystery,
    BaseMurderMysteryMode as StatsifyBaseMurderMysteryModeModel,
    StandardMurderMysteryMode as StatsifyStandardMurderMysteryModeModel,
    InfectionMurderMysteryMode as StatsifyInfectionMurderMysteryModeModel
} from '@lilithmod/unborn-hypixel/dist/statsify/models/player'
import { StatsBlockBuilder } from '../blocks'
import { ExtractFieldsOfType, FindModesWithField } from './bedwars'

export type MurderMysteryMode = ExtractFieldsOfType<MurderMystery, StatsifyBaseMurderMysteryModeModel>
export type StandardMurderMysteryMode = ExtractFieldsOfType<MurderMystery, StatsifyStandardMurderMysteryModeModel>
export type KillsMurderMysteryMode = FindModesWithField<MurderMystery, 'kills'>
export type InfectionMurderMysteryMode = ExtractFieldsOfType<MurderMystery, StatsifyInfectionMurderMysteryModeModel>

// export type MurderMysteryMode  = keyof Omit<MurderMystery, 'coins' | 'lootChests'>
// export type StandardMurderMysteryMode = keyof Omit<MurderMystery, 'coins' | 'lootChests' | 'assassins' | 'infection'>
// export type KillsMurderMysteryMode = keyof Omit<MurderMystery, 'coins' | 'lootChests' | 'infection'>
// export type InfectionMurderMysteryMode = keyof Omit<MurderMystery, 'coins' | 'lootChests' | 'overall' | 'assassins' | 'classic' | 'doubleUp'>

const murderMysteryBlocks = {
    // for all modes
    wins: (mode: MurderMysteryMode) => (new StatsBlockBuilder({
        name: 'W',
        pattern: 'murderMysteryWins',
        value: `stats.murdermystery.${mode}.wins`
    })),
    gamesPlayed: (mode: MurderMysteryMode) => (new StatsBlockBuilder({
        name: 'GP',
        pattern: 'murderMysteryGamesPlayed',
        value: `stats.murdermystery.${mode}.gamesPlayed`
    })),
    bowKills: (mode: MurderMysteryMode) => (new StatsBlockBuilder({
        name: 'BK',
        pattern: 'murderMysteryBowKills',
        value: `stats.murdermystery.${mode}.bowKills`
    })),
    goldPickedUp: (mode: MurderMysteryMode) => (new StatsBlockBuilder({
        name: 'G',
        pattern: 'murderMysteryGoldPickedUp',
        value: `stats.murdermystery.${mode}.goldPickedUp`
    })),
    // standard modes
    kills: (mode: KillsMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'K',
        pattern: 'murderMysteryKillsOrDeaths',
        value: `stats.murdermystery.${mode}.kills`
    })),
    deaths: (mode: KillsMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'D',
        pattern: 'murderMysteryKillsOrDeaths',
        value: `stats.murdermystery.${mode}.deaths`
    })),

    // role wins
    heroWins: (mode: StandardMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'HW',
        pattern: 'murderMysteryRoleWins',
        value: `stats.murdermystery.${mode}.heroWins`
    })),
    detectiveWins: (mode: StandardMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'DW',
        pattern: 'murderMysteryRoleWins',
        value: `stats.murdermystery.${mode}.detectiveWins`
    })),
    murdererWins: (mode: StandardMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'MW',
        pattern: 'murderMysteryRoleWins',
        value: `stats.murdermystery.${mode}.murdererWins`
    })),

    // types of kills
    trapKills: (mode: KillsMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'T',
        pattern: 'murderMysteryTrapKills',
        value: `stats.murdermystery.${mode}.trapKills`
    })),
    thrownKnifeKills: (mode: KillsMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'TK',
        pattern: 'murderMysteryThrownKnifeKills',
        value: `stats.murdermystery.${mode}.thrownKnifeKills`
    })),
    murdererKills: (mode: StandardMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'MK',
        pattern: 'murderMysteryMurdererKills',
        value: `stats.murdermystery.${mode}.killsAsMurderer`
    })),

    // infection
    survivorWins: (mode: InfectionMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'SW',
        pattern: 'murderMysteryWins',
        value: `stats.murdermystery.${mode}.survivorWins`
    })),
    killsAsSurvivor: (mode: InfectionMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'SK',
        pattern: 'murderMysteryKillsOrDeaths',
        value: `stats.murdermystery.${mode}.killsAsSurvivor`
    })),
    killsAsInfected: (mode: InfectionMurderMysteryMode) => (new StatsBlockBuilder({
        name: 'IK',
        pattern: 'murderMysteryKillsOrDeaths',
        value: `stats.murdermystery.${mode}.killsAsInfected`
    }))
}

export default murderMysteryBlocks