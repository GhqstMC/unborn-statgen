// const patternsFile = path.join(lilithFolder, 'patterns.yml')

export function pattern(name: keyof typeof patterns, input: number, raw?: string): string {
    // console.log(name)
    // console.log(Object.keys(patterns))
    return applyPattern(raw != null ? raw : (input ?? 0).toString(), patternForValue(input ?? 0, name)) + '&r'
}

export function applyPattern(input: string, targetPattern: string): string {
    if (targetPattern.length === 2) return `${targetPattern}${input}`
    const colors = targetPattern.match(/..?/g)
    let output = ''
    let c = 0
    for (let i = 0; i < input.length; i++) {
        output = output + colors[c] + input.charAt(i)
        c++
        if (c > colors.length - 1) c = 0
    }
    return output
}

export function patternForValue(value: number, group: string): string {
    if (patterns[group] == null) return '&f'
    for (let i = 0; i < patterns[group].length; i++) {
        try {
            if (value < patterns[group][i + 1].threshold) {
                return patterns[group][i].pattern
            }
        } catch (e) {
            return patterns[group][i].pattern
        }

    }
    return '&f'
}

// export function registerPatterns(newPatterns: any) {
//     patterns = mergeObjects(patterns, newPatterns)
// }

// export async function initializePatterns() {
//     try {
//         await fsp.access(patternsFile)
//         const downloadedFile = await fsp.readFile(patternsFile)
//         registerPatterns(yaml.parse(downloadedFile.toString()))
//     } catch (_err) {
//         try {
//             const patternsYaml = await fetchLilith('/assets/patterns.yml')
//             registerPatterns(yaml.parse(patternsYaml))
//
//         } catch (_err2) {
//
//         }
//     }
// }

// type Patterns = Record<string, Array<{
//     threshold: number
//     pattern: string
// }>>

function getCubelifyPattern(thresholds: number[]) {
    return [
        {
            threshold: thresholds[0],
            pattern: '&8'
        },
        {
            threshold: thresholds[1],
            pattern: '&7'
        },
        {
            threshold: thresholds[2],
            pattern: '&a'
        },
        {
            threshold: thresholds[3],
            pattern: '&2'
        },
        {
            threshold: thresholds[4],
            pattern: '&e'
        },
        {
            threshold: thresholds[5],
            pattern: '&6'
        },
        {
            threshold: thresholds[6],
            pattern: '&c'
        },
        {
            threshold: thresholds[7],
            pattern: '&4'
        },
        {
            threshold: thresholds[8],
            pattern: '&d'
        },
        {
            threshold: thresholds[9],
            pattern: '&5'
        },
    ]
}

const cubelifyTo25k = getCubelifyPattern([0, 125, 250, 625, 1250, 1875, 3750, 6250, 12500, 25000])
const cubelifyTo50k = getCubelifyPattern([0, 250, 500, 1250, 2500, 3750, 7500, 12500, 25000, 50000])
const cubelifyTo100k = getCubelifyPattern([0, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000])
const cubelifyTo200k = getCubelifyPattern([0, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 200000])
const cubelifyTo250k = getCubelifyPattern([0, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000])
const cubelifyTo500k = getCubelifyPattern([0, 1000, 2000, 6000, 12500, 25000, 50000, 100000, 250000, 500000])

export let patterns = {
    networkLevel: [
        {
            threshold: 0,
            pattern: '&c'
        },
        {
            threshold: 35,
            pattern: '&6'
        },
        {
            threshold: 45,
            pattern: '&a'
        },
        {
            threshold: 55,
            pattern: '&e'
        },
        {
            threshold: 65,
            pattern: '&d'
        },
        {
            threshold: 75,
            pattern: '&f'
        },
        {
            threshold: 85,
            pattern: '&9'
        }
        ,
        {
            threshold: 95,
            pattern: '&2'
        }
        ,
        {
            threshold: 150,
            pattern: '&3'
        },
        {
            threshold: 175,
            pattern: '&4'
        },
        {
            threshold: 200,
            pattern: '&5'
        },
        {
            threshold: 225,
            pattern: '&7'
        },
        {
            threshold: 250,
            pattern: '&0'
        }
    ],
    karma: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 50000,
            pattern: '&7'
        },
        {
            threshold: 250000,
            pattern: '&a'
        },
        {
            threshold: 5000000,
            pattern: '&2'
        },
        {
            threshold: 10000000,
            pattern: '&e'
        },
        {
            threshold: 25000000,
            pattern: '&6'
        },
        {
            threshold: 50000000,
            pattern: '&c'
        },
        {
            threshold: 75000000,
            pattern: '&4'
        },
        {
            threshold: 100000000,
            pattern: '&d'
        },
        {
            threshold: 150000000,
            pattern: '&5'
        },
    ],
    percentTo100: getCubelifyPattern([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]),
    // duels
    duelsWinsOrLosses: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 100,
            pattern: '&7'
        },
        {
            threshold: 200,
            pattern: '&f'
        },
        {
            threshold: 500,
            pattern: '&6'
        },
        {
            threshold: 1000,
            pattern: '&b'
        },
        {
            threshold: 2000,
            pattern: '&2'
        },
        {
            threshold: 4000,
            pattern: '&4'
        },
        {
            threshold: 10000,
            pattern: '&e'
        },
        {
            threshold: 20000,
            pattern: '&5'
        },
        {
            threshold: 50000,
            pattern: '&b&3'
        },
        {
            threshold: 100000,
            pattern: '&d'
        },
        {
            threshold: 200000,
            pattern: '&c'
        },
        {
            threshold: 500000,
            pattern: '&c&6&e&a&b&d&5'
        }
    ],
    duelsWinsOrLossesMode: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 50,
            pattern: '&7'
        },
        {
            threshold: 100,
            pattern: '&f'
        },
        {
            threshold: 250,
            pattern: '&6'
        },
        {
            threshold: 500,
            pattern: '&b'
        },
        {
            threshold: 1000,
            pattern: '&2'
        },
        {
            threshold: 2000,
            pattern: '&4'
        },
        {
            threshold: 5000,
            pattern: '&e'
        },
        {
            threshold: 10000,
            pattern: '&5'
        },
        {
            threshold: 25000,
            pattern: '&b&3'
        },
        {
            threshold: 50000,
            pattern: '&d'
        },
        {
            threshold: 100000,
            pattern: '&c'
        },
        {
            threshold: 250000,
            pattern: '&c&6&e&a&b&d&5'
        }
    ],
    duelsWLR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.25,
            pattern: '&7'
        },
        {
            threshold: 1,
            pattern: '&f'
        },
        {
            threshold: 1.5,
            pattern: '&6'
        },
        {
            threshold: 3,
            pattern: '&b'
        },
        {
            threshold: 5,
            pattern: '&2'
        },
        {
            threshold: 7.5,
            pattern: '&4'
        },
        {
            threshold: 10,
            pattern: '&e'
        },
        {
            threshold: 20,
            pattern: '&5'
        },
        {
            threshold: 40,
            pattern: '&b&3'
        },
        {
            threshold: 60,
            pattern: '&d'
        },
        {
            threshold: 80,
            pattern: '&c'
        },
        {
            threshold: 100,
            pattern: '&c&6&e&a&b&d&5'
        },
    ],
    duelsKillsOrDeaths: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 80,
            pattern: '&7'
        },
        {
            threshold: 160,
            pattern: '&f'
        },
        {
            threshold: 400,
            pattern: '&6'
        },
        {
            threshold: 800,
            pattern: '&b'
        },
        {
            threshold: 1600,
            pattern: '&2'
        },
        {
            threshold: 3200,
            pattern: '&4'
        },
        {
            threshold: 8000,
            pattern: '&e'
        },
        {
            threshold: 16000,
            pattern: '&5'
        },
        {
            threshold: 40000,
            pattern: '&b&3'
        },
        {
            threshold: 80000,
            pattern: '&d'
        },
        {
            threshold: 160000,
            pattern: '&c'
        },
        {
            threshold: 400000,
            pattern: '&c&6&e&a&b&d&5'
        }
    ],
    duelsKillsOrDeathsMode: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 40,
            pattern: '&7'
        },
        {
            threshold: 80,
            pattern: '&f'
        },
        {
            threshold: 200,
            pattern: '&6'
        },
        {
            threshold: 400,
            pattern: '&b'
        },
        {
            threshold: 800,
            pattern: '&2'
        },
        {
            threshold: 1600,
            pattern: '&4'
        },
        {
            threshold: 4000,
            pattern: '&e'
        },
        {
            threshold: 8000,
            pattern: '&5'
        },
        {
            threshold: 20000,
            pattern: '&b&3'
        },
        {
            threshold: 40000,
            pattern: '&d'
        },
        {
            threshold: 80000,
            pattern: '&c'
        },
        {
            threshold: 200000,
            pattern: '&c&6&e&a&b&d&5'
        }
    ],
    duelsKDR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.2,
            pattern: '&7'
        },
        {
            threshold: 0.8,
            pattern: '&f'
        },
        {
            threshold: 1.2,
            pattern: '&6'
        },
        {
            threshold: 2.4,
            pattern: '&b'
        },
        {
            threshold: 4,
            pattern: '&2'
        },
        {
            threshold: 6,
            pattern: '&4'
        },
        {
            threshold: 8,
            pattern: '&e'
        },
        {
            threshold: 17.8,
            pattern: '&5'
        },
        {
            threshold: 32,
            pattern: '&b&3'
        },
        {
            threshold: 48,
            pattern: '&d'
        },
        {
            threshold: 64,
            pattern: '&c'
        },
        {
            threshold: 80,
            pattern: '&c&6&e&a&b&d&5'
        },
    ],
    duelsWinstreak: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 5,
            pattern: '&7'
        },
        {
            threshold: 10,
            pattern: '&f'
        },
        {
            threshold: 20,
            pattern: '&6'
        },
        {
            threshold: 50,
            pattern: '&b'
        },
        {
            threshold: 100,
            pattern: '&2'
        },
        {
            threshold: 150,
            pattern: '&4'
        },
        {
            threshold: 200,
            pattern: '&e'
        },
        {
            threshold: 400,
            pattern: '&5'
        },
        {
            threshold: 800,
            pattern: '&b&3'
        },
        {
            threshold: 1200,
            pattern: '&d'
        },
        {
            threshold: 1600,
            pattern: '&c'
        },
        {
            threshold: 2000,
            pattern: '&c&6&e&a&b&d&5'
        },
    ],
    duelsWinstreakMode: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 2,
            pattern: '&7'
        },
        {
            threshold: 5,
            pattern: '&f'
        },
        {
            threshold: 10,
            pattern: '&6'
        },
        {
            threshold: 25,
            pattern: '&b'
        },
        {
            threshold: 50,
            pattern: '&2'
        },
        {
            threshold: 75,
            pattern: '&4'
        },
        {
            threshold: 100,
            pattern: '&e'
        },
        {
            threshold: 200,
            pattern: '&5'
        },
        {
            threshold: 400,
            pattern: '&b&3'
        },
        {
            threshold: 600,
            pattern: '&d'
        },
        {
            threshold: 800,
            pattern: '&c'
        },
        {
            threshold: 1000,
            pattern: '&c&6&e&a&b&d&5'
        },
    ],
    bridgeGoals: cubelifyTo100k,
    // bedwars
    bedwarsWinsOrLosses: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 150,
            pattern: '&7'
        },
        {
            threshold: 300,
            pattern: '&a'
        },
        {
            threshold: 450,
            pattern: '&2'
        },
        {
            threshold: 1500,
            pattern: '&e'
        },
        {
            threshold: 2250,
            pattern: '&6'
        },
        {
            threshold: 4500,
            pattern: '&c'
        },
        {
            threshold: 7500,
            pattern: '&4'
        },
        {
            threshold: 15000,
            pattern: '&d'
        },
        {
            threshold: 30000,
            pattern: '&5'
        },
    ],
    bedwarsWLR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.3,
            pattern: '&7'
        },
        {
            threshold: 0.9,
            pattern: '&a'
        },
        {
            threshold: 1.5,
            pattern: '&2'
        },
        {
            threshold: 2.1,
            pattern: '&e'
        },
        {
            threshold: 3,
            pattern: '&6'
        },
        {
            threshold: 6,
            pattern: '&c'
        },
        {
            threshold: 9,
            pattern: '&4'
        },
        {
            threshold: 15,
            pattern: '&d'
        },
        {
            threshold: 30,
            pattern: '&5'
        },
    ],
    bedwarsKillsOrDeaths: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 375,
            pattern: '&7'
        },
        {
            threshold: 750,
            pattern: '&a'
        },
        {
            threshold: 1875,
            pattern: '&2'
        },
        {
            threshold: 3750,
            pattern: '&e'
        },
        {
            threshold: 5625,
            pattern: '&6'
        },
        {
            threshold: 11250,
            pattern: '&c'
        },
        {
            threshold: 18750,
            pattern: '&4'
        },
        {
            threshold: 37500,
            pattern: '&d'
        },
        {
            threshold: 75000,
            pattern: '&5'
        },
    ],
    bedwarsKDR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.5,
            pattern: '&7'
        },
        {
            threshold: 1,
            pattern: '&a'
        },
        {
            threshold: 2,
            pattern: '&2'
        },
        {
            threshold: 3,
            pattern: '&e'
        },
        {
            threshold: 4,
            pattern: '&6'
        },
        {
            threshold: 5,
            pattern: '&c'
        },
        {
            threshold: 6,
            pattern: '&4'
        },
        {
            threshold: 7,
            pattern: '&d'
        },
        {
            threshold: 8,
            pattern: '&5'
        },
    ],
    bedwarsFinalKillsOrDeaths: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 500,
            pattern: '&7'
        },
        {
            threshold: 1000,
            pattern: '&a'
        },
        {
            threshold: 2500,
            pattern: '&2'
        },
        {
            threshold: 5000,
            pattern: '&e'
        },
        {
            threshold: 7500,
            pattern: '&6'
        },
        {
            threshold: 15000,
            pattern: '&c'
        },
        {
            threshold: 25000,
            pattern: '&4'
        },
        {
            threshold: 50000,
            pattern: '&d'
        },
        {
            threshold: 100000,
            pattern: '&5'
        },
    ],
    bedwarsFKDR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 1,
            pattern: '&7'
        },
        {
            threshold: 3,
            pattern: '&a'
        },
        {
            threshold: 5,
            pattern: '&2'
        },
        {
            threshold: 7,
            pattern: '&e'
        },
        {
            threshold: 10,
            pattern: '&6'
        },
        {
            threshold: 20,
            pattern: '&c'
        },
        {
            threshold: 30,
            pattern: '&4'
        },
        {
            threshold: 50,
            pattern: '&d'
        },
        {
            threshold: 100,
            pattern: '&5'
        },
    ],
    bedwarsBedsBrokenOrLost: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 250,
            pattern: '&7'
        },
        {
            threshold: 500,
            pattern: '&a'
        },
        {
            threshold: 1250,
            pattern: '&2'
        },
        {
            threshold: 2500,
            pattern: '&e'
        },
        {
            threshold: 3750,
            pattern: '&6'
        },
        {
            threshold: 7500,
            pattern: '&c'
        },
        {
            threshold: 12500,
            pattern: '&4'
        },
        {
            threshold: 25000,
            pattern: '&d'
        },
        {
            threshold: 50000,
            pattern: '&5'
        },
    ],
    bedwarsBBLR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.2,
            pattern: '&7'
        },
        {
            threshold: 0.6,
            pattern: '&a'
        },
        {
            threshold: 1,
            pattern: '&2'
        },
        {
            threshold: 1.4,
            pattern: '&e'
        },
        {
            threshold: 2,
            pattern: '&6'
        },
        {
            threshold: 4,
            pattern: '&c'
        },
        {
            threshold: 6,
            pattern: '&4'
        },
        {
            threshold: 10,
            pattern: '&d'
        },
        {
            threshold: 20,
            pattern: '&5'
        },
    ],
    bedwarsWinstreak: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 5,
            pattern: '&7'
        },
        {
            threshold: 15,
            pattern: '&a'
        },
        {
            threshold: 25,
            pattern: '&2'
        },
        {
            threshold: 40,
            pattern: '&e'
        },
        {
            threshold: 50,
            pattern: '&6'
        },
        {
            threshold: 75,
            pattern: '&c'
        },
        {
            threshold: 100,
            pattern: '&4'
        },
        {
            threshold: 250,
            pattern: '&d'
        },
        {
            threshold: 500,
            pattern: '&5'
        },
    ],
    // skywars
    skywarsWinsOrLosses: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 200,
            pattern: '&7'
        },
        {
            threshold: 400,
            pattern: '&a'
        },
        {
            threshold: 600,
            pattern: '&2'
        },
        {
            threshold: 2000,
            pattern: '&e'
        },
        {
            threshold: 3300,
            pattern: '&6'
        },
        {
            threshold: 6700,
            pattern: '&c'
        },
        {
            threshold: 11000,
            pattern: '&4'
        },
        {
            threshold: 22000,
            pattern: '&d'
        },
        {
            threshold: 45000,
            pattern: '&5'
        },
    ],
    skywarsWLR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.1,
            pattern: '&7'
        },
        {
            threshold: 0.3,
            pattern: '&a'
        },
        {
            threshold: 0.5,
            pattern: '&2'
        },
        {
            threshold: 0.7,
            pattern: '&e'
        },
        {
            threshold: 1,
            pattern: '&6'
        },
        {
            threshold: 2,
            pattern: '&c'
        },
        {
            threshold: 3,
            pattern: '&4'
        },
        {
            threshold: 5,
            pattern: '&d'
        },
        {
            threshold: 10,
            pattern: '&5'
        },
    ],
    skywarsKillsOrDeaths: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 1000,
            pattern: '&7'
        },
        {
            threshold: 2000,
            pattern: '&a'
        },
        {
            threshold: 6000,
            pattern: '&2'
        },
        {
            threshold: 12500,
            pattern: '&e'
        },
        {
            threshold: 18000,
            pattern: '&6'
        },
        {
            threshold: 37000,
            pattern: '&c'
        },
        {
            threshold: 62000,
            pattern: '&4'
        },
        {
            threshold: 125000,
            pattern: '&d'
        },
        {
            threshold: 250000,
            pattern: '&5'
        },
    ],
    skywarsKDR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.5,
            pattern: '&7'
        },
        {
            threshold: 1.5,
            pattern: '&a'
        },
        {
            threshold: 2.5,
            pattern: '&2'
        },
        {
            threshold: 3.5,
            pattern: '&e'
        },
        {
            threshold: 5,
            pattern: '&6'
        },
        {
            threshold: 10,
            pattern: '&c'
        },
        {
            threshold: 15,
            pattern: '&4'
        },
        {
            threshold: 25,
            pattern: '&d'
        },
        {
            threshold: 50,
            pattern: '&5'
        },
    ],
    skywarsAssists: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 50,
            pattern: '&7'
        },
        {
            threshold: 75,
            pattern: '&a'
        },
        {
            threshold: 100,
            pattern: '&2'
        },
        {
            threshold: 125,
            pattern: '&e'
        },
        {
            threshold: 200,
            pattern: '&6'
        },
        {
            threshold: 400,
            pattern: '&c'
        },
        {
            threshold: 750,
            pattern: '&4'
        },
        {
            threshold: 1250,
            pattern: '&d'
        },
        {
            threshold: 2500,
            pattern: '&5'
        },
    ],
    skywarsGamesPlayed: cubelifyTo100k,
    skywarsPlaytime: getCubelifyPattern([0, 5, 10, 100, 250, 500, 750, 1000, 2000, 5000]),
    // wool wars
    woolWarsWinsOrLosses: cubelifyTo100k,
    woolWarsWLR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 1,
            pattern: '&7'
        },
        {
            threshold: 3,
            pattern: '&a'
        },
        {
            threshold: 5,
            pattern: '&2'
        },
        {
            threshold: 7,
            pattern: '&e'
        },
        {
            threshold: 10,
            pattern: '&6'
        },
        {
            threshold: 20,
            pattern: '&c'
        },
        {
            threshold: 30,
            pattern: '&4'
        },
        {
            threshold: 50,
            pattern: '&d'
        },
        {
            threshold: 100,
            pattern: '&5'
        },
    ],
    woolWarsKillsOrDeaths: cubelifyTo200k,
    woolWarsKDR: [
        {
            threshold: 0,
            pattern: '&8'
        },
        {
            threshold: 0.25,
            pattern: '&7'
        },
        {
            threshold: 0.5,
            pattern: '&a'
        },
        {
            threshold: 1,
            pattern: '&2'
        },
        {
            threshold: 2,
            pattern: '&e'
        },
        {
            threshold: 4,
            pattern: '&6'
        },
        {
            threshold: 5,
            pattern: '&c'
        },
        {
            threshold: 10,
            pattern: '&4'
        },
        {
            threshold: 15,
            pattern: '&d'
        },
        {
            threshold: 30,
            pattern: '&5'
        },
    ],
    woolWarsPowerups: cubelifyTo250k,
    woolWarsAssists: cubelifyTo500k,
    woolWarsGamesPlayed: cubelifyTo250k,
    woolWarsBlocksBroken: cubelifyTo500k,
    woolWarsWoolPlaced: cubelifyTo500k,
    woolWarsCoins: cubelifyTo250k,
    // murder mystery
    murderMysteryWins: cubelifyTo50k,
    murderMysteryGamesPlayed: getCubelifyPattern([0, 300, 600, 1500, 3000, 4500, 9000, 15000, 30000, 60000]),
    murderMysteryBowKills: cubelifyTo50k,
    murderMysteryGoldPickedUp: cubelifyTo250k,
    murderMysteryRoleWins: getCubelifyPattern([0, 62, 125, 312, 625, 937, 1875, 3125, 6250, 12500]),
    murderMysteryKillsOrDeaths: cubelifyTo100k,
    murderMysteryTrapKills: cubelifyTo25k,
    murderMysteryMurdererKills: cubelifyTo50k,
    murderMysteryThrownKnifeKills: cubelifyTo25k
}