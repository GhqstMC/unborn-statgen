/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

export interface FormatTimeOptions {
    /**
     * Whether or not to use `s`, `m`, `h`, `d` or `seconds`, `minutes`, `hours`, `days`
     * @default true
     */
    short?: boolean;

    /**
     * How many units to display
     * @default 2
     *
     * @example
     * ```ts
     * formatTime(90060000 , { short: true, units: 1 })
     * // => 1d
     * ```
     *@example
     * ```ts
     * formatTime(90060000 , { short: true, units: 2 })
     * // => 1d 1h
     *```
     */
    entries?: number;
}

const MS = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const MONTHS = 30;
const YEARS = 12;

//Format milliseconds to a human readable string
export const formatTime = (
    ms: number,
    { short = true, entries = 2 }: FormatTimeOptions = {}
): string => {
    if (ms < MS) return `${ms}${short ? "ms" : " milliseconds"}`;

    const seconds = Math.floor(ms / MS);
    const minutes = Math.floor(seconds / SECONDS);
    const hours = Math.floor(minutes / MINUTES);
    const days = Math.floor(hours / HOURS);
    const months = Math.floor(days / MONTHS);
    const years = Math.floor(months / YEARS);

    const time = [
        { value: years, short: "y", long: "year" },
        { value: months % YEARS, short: "mo", long: "month" },
        { value: days % MONTHS, short: "d", long: "day" },
        { value: hours % HOURS, short: "h", long: "hour" },
        { value: minutes % MINUTES, short: "m", long: "minute" },
        { value: seconds % SECONDS, short: "s", long: "second" },
        { value: ms - seconds * MS, short: "ms", long: "millisecond" },
    ];

    return time
        .filter(({ value }) => value > 0)
        .map(
            (unit) =>
                `${unit.value}${short ? unit.short : ` ${unit.long}${unit.value > 1 ? "s" : ""}`}`
        )
        .splice(0, entries)
        .join(", ");
};