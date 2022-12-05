import { input } from './input'

const rawStacks = input.match(/^((\[[A-Z]\]|\s{3})\s){8}(\[[A-Z]\]|\s{3})$/gm)

const STACK_COUNT = (rawStacks[0].length + 1) / 4
const initialStacks = Array.from({ length: STACK_COUNT }).map(() => [])

const stacks = rawStacks.reverse().reduce((rStacks, row) => {
  for (let stackIndex = 0; stackIndex < STACK_COUNT; stackIndex += 1) {
    const value = row[stackIndex * 4 + 1]
    if (value && value !== ' ') {
      rStacks[stackIndex].push(value)
    }
  }
  return rStacks
}, initialStacks)

// [numToMove, sourceStack, destStack]
const commands = input.match(/^move \d+ from \d+ to \d+$/gm).map((commandStr) =>
  commandStr
    .split(' ')
    .map(Number)
    .filter((num) => !isNaN(num))
)

const part1Stacks = JSON.parse(JSON.stringify(stacks))
commands.forEach(([numToMove, sourceStack, destStack]) => {
  for (let i = 0; i < numToMove; i += 1) {
    const block = part1Stacks[sourceStack - 1].pop()
    part1Stacks[destStack - 1].push(block)
  }
})

const part1Result = part1Stacks.map((stack) => stack[stack.length - 1]).join('')

console.log(`Part 1 = ${part1Result}`)

// Part 2
const part2Stacks = JSON.parse(JSON.stringify(stacks))
commands.forEach(([numToMove, sourceStack, destStack]) => {
  const itemsToMove = part2Stacks[sourceStack - 1].splice(numToMove * -1)
  part2Stacks[destStack - 1].push(...itemsToMove)
})

const part2Result = part2Stacks.map((stack) => stack[stack.length - 1]).join('')

console.log(`Part 2 = ${part2Result}`)
