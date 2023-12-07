import { input } from './input'

const values = input.match(/\d+/gm).map(Number)

interface Race {
  time: number
  record: number
}

const winsForRace = (race: Race) => {
  let wins = 0
  for (let i = 1; i < race.time; i += 1) {
    const chargeTime = i
    const movingTime = race.time - i
    const distance = chargeTime * movingTime
    if (distance > race.record) {
      wins += 1
    }
  }
  return wins
}

const part1 = () =>
  values
    .slice(0, values.length / 2)
    .map((time, index, times) => ({
      time,
      record: values[index + times.length],
    }))
    .reduce((total, race) => total * winsForRace(race), 1)

console.log(`Part 1 = ${part1()}`)

const part2 = () =>
  winsForRace({
    time: parseInt(values.slice(0, values.length / 2).join('')),
    record: parseInt(values.slice(values.length / 2).join('')),
  })

console.log(`Part 2 = ${part2()}`)
