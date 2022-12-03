import { input } from './input'

// Parsed data
const lines = input.split('\n')

// Utils
const sum = (values: number[]) =>
  values.reduce((result, value) => result + value, 0)

const getPriority = (letter: string) => {
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt(0) - 64 + 26
  }
  return letter.toUpperCase().charCodeAt(0) - 64
}

// Part 1

const letters = lines.map((line) => {
  const firstHalf = line.slice(0, line.length / 2).split('')
  const secondHalf = line.slice(line.length / 2).split('')
  return firstHalf.find((letter) => secondHalf.includes(letter))
})

const priorities = letters.map(getPriority)

console.log(`Part 1 = ${sum(priorities)}`)

// Part 2

const findCommonItem = (group: string[]) => {
  const [pack1, pack2, pack3] = group.map((items) => [...new Set(items)])
  return pack1.find(
    (letter) => pack2.includes(letter) && pack3.includes(letter)
  )
}

const getCommonItems = () => {
  const CHUNK = 3,
    result = []
  for (let i = 0; i < lines.length - 1; i += CHUNK) {
    const group = lines.slice(i, i + CHUNK)
    const commonItem = findCommonItem(group)
    result.push(commonItem)
  }
  return result
}

const part2Result = getCommonItems().map(getPriority)

console.log(`Part 2 = ${sum(part2Result)}`)
