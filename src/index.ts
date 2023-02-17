import { ChatMessage, Color, MessageBuilder } from 'prismarine-chat'
import { patterns, pattern } from './patterns.js'

const options: {
    barColor: Color
    blockNameColor: Color
    colons: boolean
    commas: boolean
    commasEndLines: boolean
} = {
    barColor: 'blue',
    blockNameColor: 'white',
    colons: true,
    commas: true,
    commasEndLines: false
}

const validBlocks = {
    duels: {
        wins: {
            name: 'W',
            pattern: 'duelsWinsOrLosses',

        }
    }
}

const player = {
    rank: '&6[MVP&a++&6] ',
    ign: 'Sumowo',
    level: 100,
    wins: 1005,
    wlr: 55,
    kills: 10000,
    deaths: 8000,
    kdr: 0.8,
    losses: 18,
    cws: 10,
    bws: 75
}

player.wlr = parseFloat(Number(player.wins / player.losses).toFixed(2))
player.kdr = parseFloat(Number(player.kills / player.deaths).toFixed(2))

const blocks: Array<{
    name: string
    pattern: keyof typeof patterns
    value: keyof typeof player
    endOfLine?: boolean
}> = [
    {
        name: 'Lvl',
        pattern: 'levelColor',
        value: 'level',
        endOfLine: true
    },
    {
        name: 'W',
        pattern: 'winsDivision',
        value: 'wins'
    },
    {
        name: 'L',
        pattern: 'winsDivision',
        value: 'losses',
    },
    {
        name: 'W/L',
        pattern: 'wlrDivision',
        value: 'wlr',
        endOfLine: true
    },
    {
        name: 'K',
        pattern: 'winsDivision',
        value: 'kills'
    },
    {
        name: 'K/D',
        pattern: 'skywarsKDR',
        value: 'kdr',
        endOfLine: true
    },
    {
        name: 'CWS',
        pattern: 'wsDivisionOverall',
        value: 'cws'
    },
    {
        name: 'BWS',
        pattern: 'wsDivisionOverall',
        value: 'bws',
        endOfLine: true
    },
]

const builder = new MessageBuilder()

builder.setText('▌ ').setColor(options.barColor)
builder.addExtra(MessageBuilder.fromString(player.rank + player.ign + ' '))

for (const block of blocks) {
    const isFinal = blocks[blocks.length - 1] === block
    builder.addExtra(
        new MessageBuilder()
            .setText(`${block.name}${options.colons ? ': ' : ' '}`)
            .setColor(options.blockNameColor)
            .addExtra(
                MessageBuilder.fromString(pattern(block.pattern, player[block.value] as number))
            )
            .addExtra(!isFinal ? `${options.commas && ((block.endOfLine && options.commasEndLines) || !block.endOfLine) ? ',' : ''}${block.endOfLine ? '\n' : ' '}` : '')
    )
    if (block.endOfLine && !isFinal) {
        builder.addExtra(
            new MessageBuilder()
                .setText('▌ ')
                .setColor(options.barColor)
        )
    }
}

// console.log(JSON.stringify(builder.toJSON(), null, 2))
// console.log(new ChatMessage(builder).toMotd())
console.log(new ChatMessage(builder).toAnsi())