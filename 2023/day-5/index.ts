import { input } from './input'

type MapFunc = (inputValue: number) => number

const maps = input
  .match(/^.+map:(?:\n(?:\d+ ?)+)+$/gm)
  .reduce<Record<string, MapFunc>>((result, mapStr) => {
    // Extract the values
    const mapName = mapStr.match(/^(.*) map:/)[1]
    // rows
    const mappings = mapStr
      .match(/((?:\d+ ?)+)/gm)
      .map((str) => str.split(' ').map(Number))
      .map(([dest, source, length]) => ({
        dest,
        source,
        length,
      }))

    return {
      ...result,
      [mapName]: (inputValue: number) => {
        for (let mapIndex in mappings) {
          const mapping = mappings[mapIndex]
          const diff = mapping.dest - mapping.source
          if (
            inputValue >= mapping.source &&
            inputValue < mapping.source + mapping.length
          ) {
            return inputValue + diff
          }
        }
        return inputValue
      },
      [`reverse-${mapName}`]: (destValue: number) => {
        for (let mapIndex in mappings) {
          const mapping = mappings[mapIndex]
          const diff = mapping.source - mapping.dest
          if (
            destValue >= mapping.dest &&
            destValue < mapping.dest + mapping.length
          ) {
            return destValue + diff
          }
        }
        return destValue
      },
    }
  }, {})

const findValue = (sourceName: string, sourceValue: number) => {
  const mapping = Object.entries(maps).find(([mapName]) =>
    mapName.startsWith(sourceName)
  )
  if (!mapping || !sourceName) {
    return sourceValue
  }
  const destName = mapping[0].split('-')[2]
  const destValue = mapping[1](sourceValue)
  console.log(mapping[0], sourceValue, destValue)
  const value = findValue(destName, destValue)
  return value
}

const findReverseValue = (destName: string, destValue: number) => {
  const mapping = Object.entries(maps).find(
    ([mapName]) => mapName.startsWith('reverse') && mapName.endsWith(destName)
  )
  if (!mapping || !destName) {
    return destValue
  }
  const souceName = mapping[0].split('-')[1]
  const sourceValue = mapping[1](destValue)
  // console.log(mapping[0], sourceValue, sourceValue)
  const value = findReverseValue(souceName, sourceValue)
  return value
}

const part1 = () => {
  const values = input
    .match(/^seeds: ((?:\d+ ?)+)$/m)[1]
    .split(' ')
    .map(Number)
    .map((seed) => findValue('seed', seed))

  return Math.min(...values)
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  // build new range of seeds
  const ranges = input
    .match(/^seeds: ((?:\d+ ?)+)$/m)[1]
    .match(/\d+ \d+/g)
    .map((str) => str.match(/\d+/g).map(Number))

  let seedGuess = 0
  while (seedGuess < 1000000000) {
    const reverseValue = findReverseValue('location', seedGuess)
    for (let rangeIndex in ranges) {
      const range = ranges[rangeIndex]
      if (reverseValue >= range[0] && reverseValue < range[0] + range[1]) {
        return seedGuess
      }
    }

    seedGuess += 1
  }
}

console.log(`Part 2 = ${part2()}`)
