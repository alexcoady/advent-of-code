import { input } from './input'

const grid = input.split('\n').map((str) => str.split('').map(Number))

// Count trees at grid boundary
const edgeCount = grid.length * 2 + grid[0].length * 2 - 4

const isTreeVisibleFromOutside = (x: number, y: number) => {
  const tree = grid[y][x]
  const row = grid[y]
  const col = grid.map((r) => r[x])

  const left = row.slice(0, x)
  const right = row.slice(x + 1)
  const top = col.slice(0, y)
  const bottom = col.slice(y + 1)

  return (
    [left, right, top, bottom].filter((trees) =>
      trees.find((height) => height >= tree)
    ).length < 4
  )
}

const visibleTrees = []
for (let y = 1; y < grid.length - 1; y += 1) {
  const row = grid[y]
  for (let x = 1; x < row.length - 1; x += 1) {
    if (isTreeVisibleFromOutside(x, y)) {
      visibleTrees.push([x, y])
    }
  }
}

console.log(`Part 1 = ${edgeCount + visibleTrees.length}`)

// Part 2

const getScenicScore = (x: number, y: number) => {
  const tree = grid[y][x]
  const row = grid[y]
  const col = grid.map((r) => r[x])

  const left = row.slice(0, x).reverse()
  const right = row.slice(x + 1)
  const top = col.slice(0, y).reverse()
  const bottom = col.slice(y + 1)

  return [left, right, top, bottom].reduce((result, trees, index) => {
    // count trees viewable and add to result
    let visible = 0
    for (let i = 0; i < trees.length; i += 1) {
      const test = trees[i]
      visible += 1
      if (test >= tree) {
        break
      }
    }
    return result * visible
  }, 1)
}

const scenicScores = []
for (let y = 1; y < grid.length - 1; y += 1) {
  const row = grid[y]
  for (let x = 1; x < row.length - 1; x += 1) {
    scenicScores.push(getScenicScore(x, y))
  }
}

console.log(`Part 2 = ${Math.max(...scenicScores)}`)
