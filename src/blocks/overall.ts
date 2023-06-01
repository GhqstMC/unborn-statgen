import { Color } from 'prismarine-chat'
import { colorToCode } from '../colors'
import { StatsBlockBuilder } from '../blocks'

const overallBlocks = {
    bar: (color: Color) => (new StatsBlockBuilder({
        name: 'Bar',
        render: () => {
            return `${colorToCode[color]}▌ `
        }
    })),
    playerName: ({ prefix = '', suffix = '' }: { prefix?: string, suffix?: string }) => (new StatsBlockBuilder({
            name: 'Player Name',
            render: (player) => {
                return `${prefix}${player.displayName}${suffix} `
            }
    })),
    level: () => (new StatsBlockBuilder({
        name: 'Lvl',
        pattern: 'networkLevel',
        format: 'to0Fixed',
        value: 'stats.general.networkLevel'
    })),
    exp: () => (new StatsBlockBuilder({
        name: 'EXP',
        value: 'stats.general.networkExp',
        format: 'abbreviate2Fixed'
    })),
    karma: () => (new StatsBlockBuilder({
        name: 'Karma',
        value: 'stats.general.karma',
        format: 'abbreviate'
    })),
}

export default overallBlocks