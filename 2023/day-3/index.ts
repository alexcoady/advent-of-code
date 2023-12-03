import { input } from './input'

const rows = input.split(/\n/)
const rowValues = rows.map((row) => {
  const match = [...row.matchAll(/\d+/g)]
  return match
})

const touchesSymbol = (
  startRow: number,
  match: RegExpMatchArray,
  symbol: RegExp
) => {
  const strLength = `${match}`.length
  for (
    let row = Math.max(0, startRow - 1);
    row <= Math.min(startRow + 1, rows.length - 1);
    row += 1
  ) {
    for (
      let col = Math.max(0, match.index - 1);
      col <= Math.min(match.index + strLength, rows[row].length - 1);
      col += 1
    ) {
      if (row === 0 && col === 0) continue
      if (rows[row][col].match(symbol)) {
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
