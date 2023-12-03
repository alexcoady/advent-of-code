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
  for (let charIndex = 0; charIndex < `${match}`.length; charIndex += 1) {
    // Each char within the number
    const startCol = match.index + charIndex
    for (
      let rowIndex = Math.max(0, startRow - 1);
      rowIndex <= Math.min(startRow + 1, rows.length - 1);
      rowIndex += 1
    ) {
      for (
        let colIndex = Math.max(0, startCol - 1);
        colIndex <= Math.min(startCol + 1, rows[rowIndex].length - 1);
        colIndex += 1
      ) {
        if (rowIndex === 0 && colIndex === 0) continue
        if (rows[rowIndex][colIndex].match(symbol)) {
          return { row: rowIndex, col: colIndex }
        }
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