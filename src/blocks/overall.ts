import { StatsBlocks } from '../blocks.js'

const overallBlocks: StatsBlocks = {
    level: {
        name: 'Lvl',
        pattern: 'networkLevel',
        value: 'stats.general.networkLevel'
    },
    exp: {
        name: 'EXP',
        value: 'stats.general.networkExp',
        format: 'abbreviate2Fixed'
    },
    karma: {
        name: 'Karma',
        value: 'stats.general.karma',
        format: 'abbreviate'
    }
}

export default overallBlocks