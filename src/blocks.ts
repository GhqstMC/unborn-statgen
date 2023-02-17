import { pattern, patterns } from './patterns.js'
import { StatsifyPlayer } from '@lilithmod/unborn-hypixel'
import { Color } from 'prismarine-chat'
import get from 'lodash.get'
import numeral from 'numeral'

export type StatsBlocks = Record<string, {
    name: string,
    pattern?: keyof typeof patterns,
    value: Path<StatsifyPlayer>,
    format?: keyof typeof formatters,
    render?: (player: StatsifyPlayer, endOfLine: boolean) => string
}>

export const formatters = {
    to2Fixed: (num: number) => {
        return num.toFixed(2)
    },
    to1Fixed: (num: number) => {
        return num.toFixed(1)
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
    colons: boolean
    commas: boolean
    commasEndLines: boolean
}

const colorMap = {
    'black': '&0',
    'dark_blue': '&1',
    'dark_green': '&2',
    'dark_aqua': '&3',
    'dark_red': '&4',
    'dark_purple': '&5',
    'gold': '&6',
    'gray': '&7',
    'dark_gray': '&8',
    'blue': '&9',
    'green': '&a',
    'aqua': '&b',
    'red': '&c',
    'light_purple': '&d',
    'yellow': '&e',
    'white': '&f'
}

export function defaultBlockRender(this: StatsBlocks[keyof StatsBlocks], player: StatsifyPlayer, options: RenderOptions, endOfLine: boolean) {
    const value = get(player, this.value)
    return `${colorMap[options.blockNameColor]}${this.name}${options.colons ? ':' : ''} ${
        this.pattern ? pattern(this.pattern, value) : value}${
        endOfLine && !options.commasEndLines ? (options.commas ? ',' : '') : ''}`
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