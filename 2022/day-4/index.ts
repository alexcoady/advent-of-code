import { input } from './input'

const pairs = input.split('\n').map((pair) =>
  pair
    .split(',')
    .map((assignment) => assignment.split('-').map(Number))
    .sort((a, b) => (a[0] - b[0] === 0 ? b[1] - a[1] : a[0] - b[0]))
)

const resultsPart1 = pairs.filter((pair) => pair[0][1] >= pair[1][1])
console.log(`Part 1 = ${resultsPart1.length}`)

// Part 2

const resultsPart2 = pairs.filter((pair) => pair[0][1] >= pair[1][0])
console.log(`Part 2 = ${resultsPart2.length}`)
