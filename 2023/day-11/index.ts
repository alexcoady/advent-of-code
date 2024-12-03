import { sortBy, uniqWith } from 'lodash'
import { input } from './input'

// console.log(rawRows)

enum Cell {
  Galaxy = '#',
  Empty = '.',
  Expanded = '*',
}

type Rows = Cell[][]

interface Location {
  x: number
  y: number
}

function expandData(rows: Rows) {
  for (let x = 0; x < rows[0].length; x += 1) {
    const col = rows.map((row) => row[x])
    if (col.every((cell) => cell !== Cell.Galaxy)) {
      rows.forEach((row) => row.splice(x, 0, Cell.Expanded))
      x += 1
    }
  }
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y]
    if (row.every((cell) => cell !== Cell.Galaxy)) {
      rows.splice(
        y,
        0,
        row.map(() => Cell.Expanded)
      )
      y += 1
    }
  }
  return rows
}

function getGalaxiesForRows(rows: Rows) {
  return rows.reduce<Location[]>((result, row, rowIndex) => {
    // find galaxies on row and add to result
    const galaxies = []
    row.forEach((cell, cellIndex) => {
      if (cell === Cell.Galaxy) {
        galaxies.push({ y: rowIndex, x: cellIndex })
      }
    })
    return result.concat(galaxies)
  }, [])
}

function generatePairs(galaxies: Location[]) {
  const allPairs = galaxies.reduce<[Location, Location][]>(
    (result, galaxyLocation, _index, allGalaxies) => {
      allGalaxies.forEach((pairGalaxyLocation) => {
        if (
          galaxyLocation.x !== pairGalaxyLocation.x ||
          galaxyLocation.y !== pairGalaxyLocation.y
        ) {
          result.push(
            sortBy([galaxyLocation, pairGalaxyLocation], 'x', 'y') as [
              Location,
              Location
            ]
          )
        }
      })
      return result
    },
    []
  )
  return uniqWith(allPairs, (aVals, bVals) => {
    return (
      aVals[0].x === bVals[0].x &&
      aVals[0].y === bVals[0].y &&
      aVals[1].x === bVals[1].x &&
      aVals[1].y === bVals[1].y
    )
  })
}

const part1 = () => {
  const rawRows = input.split(/\n/).map((rowStr) => rowStr.split('')) as Rows
  const expanded = expandData(rawRows)
  const galaxies = getGalaxiesForRows(expanded)
  console.log(expanded.map((row) => row.join('')))
  const pairs = generatePairs(galaxies)
  const distances = pairs.map(
    (pair) => Math.abs(pair[1].x - pair[0].x) + Math.abs(pair[1].y - pair[0].y)
  )
  return distances.reduce((result, distance) => result + distance, 0)
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const rawRows = input.split(/\n/).map((rowStr) => rowStr.split('')) as Rows
  const expanded = expandData(rawRows)

  function getDistanceBetweenPair(pair: [Location, Location]) {
    const location1 = pair[0]
    const location2 = pair[1]
    const path: Location[] = []
    // console.log(`GENERATE.....`)
    // console.log(pair)
    // // Horizontal first
    // range(location1.x, location2.x)
    //   .slice(1)
    //   .forEach((x) => {
    //     path.push({ y: location1.y, x })
    //   })

    // range(location1.y, location2.y).forEach((y) => {
    //   path.push({ y, x: location2.x })
    // })

    // Try to go in increments of 1/-1
    const xDiff = location2.x - location1.x
    const yDiff = location2.y - location1.y
    const count = Math.abs(xDiff) + Math.abs(yDiff)

    let pointer = { ...location1 }

    // console.log('count', count)

    for (let i = 0; i < count; i += 1) {
      // Each go
      const xTurn =
        (pointer.y === location2.y ||
          (i % 2 === 0 && pointer.x !== location2.x)) &&
        pointer.x !== location2.x
      if (xTurn) {
        const x = pointer.x + (xDiff > 0 ? 1 : -1)
        pointer.x = x
      } else {
        const y = pointer.y + (yDiff > 0 ? 1 : -1)
        pointer.y = y
      }
      path.push({ y: pointer.y, x: pointer.x })
      // console.log(`try ${xTurn ? 'x' : 'y'}`, pointer)
    }

    // console.log(yDiff, xDiff)

    // path.push(location2)
    const cells = path.map<Cell>((location) => expanded[location.y][location.x])
    const lengths = cells.map(
      (cell) =>
        ({
          [Cell.Empty]: 1,
          [Cell.Expanded]: 1000000,
          [Cell.Galaxy]: 1,
        }[cell])
    )
    const totalLength = lengths.reduce((result, length) => result + length, 0)
    // console.log(path.length, cells, lengths, totalLength)
    return totalLength
  }

  // console.log(expanded.map((row) => row.join('')))

  const galaxies = getGalaxiesForRows(expanded)
  const pairs = generatePairs(galaxies)
  // get PATHS from 1 to the next and then calc the value of the path
  const lengths = pairs.map((pair) => {
    // calculate path for pair
    return getDistanceBetweenPair(pair)
  })
  console.log(lengths)
  return lengths.reduce((result, length) => result + length, 0)
}

console.log(`Part 2 = ${part2()}`)
