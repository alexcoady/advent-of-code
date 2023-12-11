import { input } from './input'

const makeRowIterator = (row: number[]) => {
  const newRows = [row]
  return {
    next: () => {
      const sourceRow = newRows[newRows.length - 1]

      const newRow = []
      for (let i = 0; i < sourceRow.length - 1; i += 1) {
        newRow.push(sourceRow[i + 1] - sourceRow[i])
      }
      newRows.push(newRow)

      return {
        value: newRows,
        done: newRow.every((val) => val === 0),
      }
    },
  }
}

const parseValues = (rawInput: string) =>
  rawInput.split(/\n/).map((rowStr) => rowStr.match(/-?\d+/g).map(Number))

const loopRows = (
  rows: number[][],
  modifier: (row: number[], nextRow: number[]) => void
) => {
  for (let i = rows.length - 2; i > -1; i -= 1) {
    modifier(rows[i], rows[i + 1])
  }
}

const part1 = () => {
  function appendValues(rows: number[][]) {
    loopRows(rows, (row, nextRow) => {
      row.push(row[row.length - 1] + nextRow[nextRow.length - 1])
    })
    return rows
  }

  function calculateNextValue(row: number[]) {
    const iterator = makeRowIterator(row)
    let result = iterator.next()
    while (!result.done) {
      result = iterator.next()
    }
    const resultRow = appendValues(result.value)[0]
    return resultRow[resultRow.length - 1]
  }

  return parseValues(input).reduce(
    (result, row) => result + calculateNextValue(row),
    0
  )
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  function prependValues(rows: number[][]) {
    loopRows(rows, (row, nextRow) => {
      row.unshift(row[0] - nextRow[0])
    })
    return rows
  }

  function calculatePrevValue(row: number[]) {
    const iterator = makeRowIterator(row)
    let result = iterator.next()
    while (!result.done) {
      result = iterator.next()
    }
    return prependValues(result.value)[0][0]
  }

  return parseValues(input).reduce(
    (result, row) => result + calculatePrevValue(row),
    0
  )
}

console.log(`Part 2 = ${part2()}`)
