import { ChatMessage, Color, MessageBuilder } from 'prismarine-chat'
import overallBlocks from './blocks/overall'
import { Blocks, render, RenderOptions, StatsBlock } from './blocks'
import { fetchPlayerRaw, StatsifyPlayer } from '@lilithmod/unborn-hypixel'
import duelsBlocks, {
    BridgeDuelsMode,
    DuelsMode,
    isBridgeDuelsMode,
    isDuelsPVPMode,
    ProgressionStyle
} from './blocks/duels'
import skywarsBlocks, { SkywarsMode } from './blocks/skywars'

const options: RenderOptions = {
    blockNameColor: 'white',
    defaultBlockValueColor: 'gray',
    colons: true,
    commas: true,
    commasEndLines: true
}

;(async () => {
    const data = await fetchPlayerRaw('a66487e6-c8a5-4202-959d-a1e43cc4a2b4', '33c686bb-bd2b-4dc1-9e3c-4c5d12dcf496')
    if (!data.success) return
    const player = new StatsifyPlayer(data.player)

    // const message = getDuelsBlocksFromOptions('bridge.overall', {
    //     barColor: 'blue',
    //     showGoals: true,
    //     showProgression: false,
    //     showTitle: false,
    //     showKills: false,
    //     showLosses: true,
    //     showWinstreak: true
    // }).render(player, options)

    const message = getSkywarsBlocksFromOptions('overall', {
        barColor: 'blue',
    }).render(player, options)

    const chatMessage = new ChatMessage(MessageBuilder.fromString(message, { colorSeparator: '&' }))
    // console.log(chatMessage.toMotd())
    console.log(chatMessage.toAnsi())
    // for (const style of ['ratio', 'ratioTo', 'ratioArrow', 'percentage', 'percentageTo', 'percentageArrow'] as ProgressionStyle[]) {
    //     const message = render(duelsBlocksWithProgression('bridge.overall', 'blue', style), player, options)
    //     const chatMessage = new ChatMessage(MessageBuilder.fromString(message, { colorSeparator: '&' }))
    //     // console.log(chatMessage.toMotd())
    //     console.log(chatMessage.toAnsi())
    // }

})()

type InferArray<T> = T extends Array<infer U> ? U : T

export class BlocksBuilder {

    list: Blocks = []

    constructor(blocks?: Blocks) {
        this.list = blocks ?? []
    }

    add(block: InferArray<Blocks>) {
        this.list.push(block)
        return this
    }

    render(player: StatsifyPlayer, options: RenderOptions) {
        return render(this.list, player, options)
    }

}

export class BarBlocksBuilder extends BlocksBuilder {

    barColor: Color

    constructor(barColor: Color, blocks?: Blocks) {
        super(blocks)
        this.barColor = barColor
        this.list.push(overallBlocks.bar(barColor))
    }

    newline() {
        this.list.push('\n')
        this.list.push(overallBlocks.bar(this.barColor))
        return this
    }

}

type SkywarsBlockOptions = {
    barColor: Color
    showPlaytime?: boolean
}

function getSkywarsBlocksFromOptions(mode: SkywarsMode, options: SkywarsBlockOptions): BlocksBuilder {
    const blocks = new BarBlocksBuilder(options.barColor)
    blocks
        .add(skywarsBlocks.star())
        .add(overallBlocks.playerName({}))
        .add(overallBlocks.level())

    blocks.add(skywarsBlocks.kills(mode))
    blocks.newline()
    blocks.add(skywarsBlocks.kdr(mode))
    blocks.add(skywarsBlocks.wlr(mode))
    blocks.add(skywarsBlocks.wins(mode))
    blocks.add(skywarsBlocks.playtime())
    blocks.add(skywarsBlocks.corruptionChance())
        // .add(skywarsBlocks.wins(mode))
        // .newline()
        // // .add(skywarsBlocks.losses(mode))
        // .add(skywarsBlocks.wlr(mode))
        // .add(skywarsBlocks.kills(mode))
        // // .add(skywarsBlocks.deaths(mode))
        // .add(skywarsBlocks.kdr(mode))
        // // .add(skywarsBlocks.level())

        // .add(skywarsBlocks.levelFormatted())
        // .add(skywarsBlocks.nextLevelFormatted())
    return blocks
}

type DuelsBlockOptions = {
    barColor: Color
    showTitle?: boolean
    showProgression?: boolean
    progressionStyle?: ProgressionStyle
    showKills?: boolean
    showLosses?: boolean
    showGoals?: boolean
    showWinstreak?: boolean
}

function getDuelsBlocksFromOptions(mode: DuelsMode, options: DuelsBlockOptions): BlocksBuilder {
    const blocks = new BarBlocksBuilder(options.barColor)
    if (options.showTitle) blocks.add(duelsBlocks.title(mode))
    blocks
        .add(overallBlocks.playerName({}))
        .add(overallBlocks.level())
    if (options.showTitle) {
        blocks.newline()
        if (options.showProgression) {
            blocks.add(duelsBlocks.progression(mode, options.progressionStyle ?? 'percentage'))
        }
    }
    blocks.add(duelsBlocks.wins(mode))
    if (!options.showTitle) {
        blocks.newline()
        if (options.showProgression) {
            blocks.add(duelsBlocks.progression(mode, options.progressionStyle ?? 'percentage'))
        }
    }
    if (options.showLosses) blocks.add(duelsBlocks.losses(mode))
    blocks.add(duelsBlocks.wlr(mode))
    if (options.showWinstreak) {
        if (options.showProgression) blocks.newline()
        blocks.add(duelsBlocks.winstreak(mode))
        if (!options.showProgression && options.showLosses && options.showKills) blocks.newline()
        blocks.add(duelsBlocks.bestWinstreak(mode))
        if (options.showProgression && options.showGoals && isBridgeDuelsMode(mode)) {
            blocks.add(duelsBlocks.goals(mode))
        }
    }
    if (options.showKills && isDuelsPVPMode(mode)) {
        // if (options.showWinstreak && options.showProgression && options.showLosses) newline(blocks, options.barColor)
        blocks.add(duelsBlocks.kills(mode))
            .add(duelsBlocks.deaths(mode))
            .add(duelsBlocks.kdr(mode))
    }
    if (options.showGoals && isBridgeDuelsMode(mode) && !options.showProgression) blocks.add(duelsBlocks.goals(mode))
    return blocks
}

// const builder = new MessageBuilder()
//
// builder.setText('▌ ').setColor(options.barColor)
// builder.addExtra(MessageBuilder.fromString(player.rank + player.ign + ' '))

// for (const block of blocks) {
//     const isFinal = blocks[blocks.length - 1] === block
//     builder.addExtra(
//         new MessageBuilder()
//             .setText(`${block.name}${options.colons ? ': ' : ' '}`)
//             .setColor(options.blockNameColor)
//             .addExtra(
//                 MessageBuilder.fromString(pattern(block.pattern, player[block.value] as number))
//             )
//             .addExtra(!isFinal ? `${options.commas && ((block.endOfLine && options.commasEndLines) || !block.endOfLine) ? ',' : ''}${block.endOfLine ? '\n' : ' '}` : '')
//     )
//     if (block.endOfLine && !isFinal) {
//         builder.addExtra(
//             new MessageBuilder()
//                 .setText('▌ ')
//                 .setColor(options.barColor)
//         )
//     }
// }

// console.log(JSON.stringify(builder.toJSON(), null, 2))
// console.log(new ChatMessage(builder).toMotd())
// console.log(new ChatMessage(builder).toAnsi())