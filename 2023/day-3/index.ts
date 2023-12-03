import { input } from './input'

const rowStrings = input.split(/\n/)
const rowValues = rowStrings.map((row) => [...row.matchAll(/\d+/g)])

/**
 * loop around the number and test for symbol
 */
const touchesSymbol = (
  startRow: number,
  match: RegExpMatchArray,
  symbol: RegExp
) => {
  const strLength = `${match}`.length
  for (let row = startRow - 1; row <= startRow + 1; row += 1) {
    for (let col = match.index - 1; col <= match.index + strLength; col += 1) {
      if (rowStrings[row]?.[col]?.match(symbol)) {
        return { row, col }
      }
    }
  }
}

const part1 = () =>
  rowValues.reduce(
    (result, numbersInRow, rowIndex) =>
      result +
      numbersInRow
        .filter((num) => touchesSymbol(rowIndex, num, /[^\.\da-z]/))
        .map((num) => parseInt(num.toString()))
        .reduce((r, n) => r + n, 0),
    0
  )

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const gearMap: Record<string, number[]> = {}
  rowValues.forEach((numbersInRow, rowIndex) => {
    numbersInRow.forEach((num) => {
      const gearLocation = touchesSymbol(rowIndex, num, /\*/)
      if (gearLocation) {
        const mapIndex = JSON.stringify(gearLocation)
        gearMap[mapIndex] = (gearMap[mapIndex] ?? []).concat(+num)
      }
    })
  })

  return Object.values(gearMap)
    .filter((values) => values.length === 2)
    .reduce((result, values) => result + values[0] * values[1], 0)
}

console.log(`Part 2 = ${part2()}`)
