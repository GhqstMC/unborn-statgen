import { pattern, patterns } from './patterns'
import { StatsifyPlayer } from '@lilithmod/unborn-hypixel'
import { Color } from 'prismarine-chat'
import get from 'lodash.get'
import numeral from 'numeral'
import { colorToCode } from './colors'

export type StatsBlock = {
    name: string
    pattern?: keyof typeof patterns
    value?: Path<Omit<StatsifyPlayer, 'rawData'>> | ((player: StatsifyPlayer) => number)
    format?: keyof typeof formatters | ((value: number, options: RenderOptions) => string)
    render?: (player: StatsifyPlayer, options: RenderOptions, endOfLine: boolean) => string
}

export class StatsBlockBuilder {

    block: StatsBlock

    constructor(block: StatsBlock) {
        this.block = block
    }

    name(name: string) {
        this.block.name = name
        return this
    }

    format(format: keyof typeof formatters | ((value: number, options: RenderOptions) => string)) {
        this.block.format = format
        return this
    }

    pattern(pattern: keyof typeof patterns) {
        this.block.pattern = pattern
        return this
    }

    value(value: Path<Omit<StatsifyPlayer, 'rawData'>> | ((player: StatsifyPlayer) => number)) {
        this.block.value = value
        return this
    }

    render(render: (player: StatsifyPlayer, options: RenderOptions, endOfLine: boolean) => string) {
        this.block.render = render
        return this
    }
}

export type StatsBlockDefinitions = Record<string, ((...args) => StatsBlockBuilder)>

export type Blocks = Array<StatsBlock | StatsBlockBuilder | '\n'>

export const formatters = {
    to2Fixed: (num: number) => {
        return num.toFixed(2)
    },
    to1Fixed: (num: number) => {
        return num.toFixed(1)
    },
    to0Fixed: (num: number) => {
        return Math.round(num).toString()
    },
    abbreviate2Fixed: (num: number) => {
        return numeral(num).format('0.00a')
    },
    abbreviate1Fixed: (num: number) => {
        return numeral(num).format('0.0a')
    },
    abbreviate: (num: number) => {
        return numeral(num).format('0a')
    }
}

export interface RenderOptions {
    blockNameColor: Color
    defaultBlockValueColor: Color
    colons: boolean
    commas: boolean
    commasEndLines: boolean
}

export function renderBlock(block: StatsBlock, player: StatsifyPlayer, options: RenderOptions, endOfLine: boolean): string {
    if (block.render != null) return block.render(player, options, endOfLine)

    let value
    if (typeof block.value === 'function') {
        value = block.value(player)
    } else if (typeof block.value === 'string') {
        value = get(player, block.value)
        if (value == null) value = 'N/A'
    } else {
        value = 'N/A'
    }

    let formattedValue
    try {
        if (typeof block.format === 'function') {
            formattedValue = block.format(value, options)
        } else if (typeof block.format === 'string') {
            formattedValue = formatters[block.format](value)
        } else {
            formattedValue = value.toString()
        }
    } catch(e) {
        formattedValue = value.toString()
    }

    let patternedValue = colorToCode[options.defaultBlockValueColor] + (formattedValue ?? '')
    if (block.pattern != null && value !== 'N/A') {
        patternedValue = pattern(block.pattern, value, formattedValue)
    }

    // console.log(formattedValue)
    const str = `${colorToCode[options.blockNameColor]}${block.name}${options.colons ? ':' : ''} ${
        patternedValue}`
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
    return str
}

export function render(blocks: Blocks, player: StatsifyPlayer, options: RenderOptions): string {
    let str = ''
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        if (block === '\n') {
            str += '\n'
            continue
        }
        const rendered = renderBlock('block' in block ? block.block : block, player, options, blocks[i + 1] === '\n')
        if (i === blocks.length - 1 && rendered.endsWith(',')) {
            str += rendered.substring(0, rendered.length - 1)
        } else if (i === blocks.length - 1 && rendered.endsWith(', ')) {
            str += rendered.substring(0, rendered.length - 2)
        } else {
            str += rendered
        }
    }
    return str
}

export type Path<T> = PathImpl<T, keyof T> | keyof T;

type PathImpl<T, K extends keyof T> =
    K extends string
        ? T[K] extends Record<string, any>
            ? T[K] extends ArrayLike<any>
                ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
                : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
            : K
        : never;


type PathValue<T, P extends Path<T>> =
    P extends `${infer K}.${infer Rest}`
        ? K extends keyof T
            ? Rest extends Path<T[K]>
                ? PathValue<T[K], Rest>
                : never
            : never
        : P extends keyof T
            ? T[P]
            : never;