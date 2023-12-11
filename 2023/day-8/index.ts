import { input } from './input'

interface Entry {
  location: string
  L: string
  R: string
}

const entryMap = input
  .match(/[A-Z\d]{3} = \([A-Z\d]{3}, [A-Z\d]{3}\)/gm)
  .map((rowStr) => rowStr.match(/[A-Z\d]{3}/g))
  .map<Entry>((rowStrs) => ({
    location: rowStrs[0],
    L: rowStrs[1],
    R: rowStrs[2],
  }))
  .reduce(
    (result, entry) => result.set(entry.location, entry),
    new Map<string, Entry>()
  )

const directions = input.match(/[A-Z]+$/m).toString()

const findCountIterator = (
  startEntry: Entry,
  isDone: (entry: Entry) => boolean
) => {
  let index = 0
  let entry = startEntry
  let done = false
  return {
    next: () => {
      if (done) {
        return { value: index, done: true }
      }
      const direction = directions[index % directions.length]
      const nextLocation = entry[direction]
      const nextEntry = entryMap.get(nextLocation)

      // Update values
      entry = nextEntry
      index += 1
      const doneThisTime = isDone(entry)
      done = doneThisTime
      return {
        value: index,
        done: doneThisTime,
      }
    },
  }
}

const lowestCommonMultiple = (values: number[]) => {
  function gcd(a: number, b: number) {
    return !b ? a : gcd(b, a % b)
  }

  function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b)
  }

  let result = 1
  values.forEach((value) => {
    result = lcm(result, value)
  })

  return result
}

const part1 = () => {
  const iterator = findCountIterator(
    entryMap.get('AAA'),
    (entry) => entry.location === 'ZZZ'
  )
  let result = iterator.next()
  while (!result.done) {
    result = iterator.next()
  }
  return result.value
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const startingLocations = [...entryMap.keys()].filter((entryKey) =>
    entryKey.endsWith('A')
  )

  const iterators = startingLocations.map((location) =>
    findCountIterator(entryMap.get(location), (entry) =>
      entry.location.endsWith('Z')
    )
  )

  let results = iterators.map((iterator) => iterator.next())
  while (results.some((result) => !result.done)) {
    results = iterators.map((iterator) => iterator.next())
  }

  return lowestCommonMultiple(results.map((result) => result.value))
}

console.log(`Part 2 = ${part2()}`)
