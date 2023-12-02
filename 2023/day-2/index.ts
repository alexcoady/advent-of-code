import { input } from './input'

const games = input.split(/\n/).map((rowStr) => {
  const [_, gameId, gameValues] = rowStr.match(/^Game (\d+): (.+)/)
  const valuesMatched = [...gameValues.match(/\d+ (?:blue|red|green)/g)]
  return { gameId, valuesMatched }
})

const part1 = () => {
  const cubeCounts = {
    red: 12,
    green: 13,
    blue: 14,
  }
  const possible = games.filter(({ valuesMatched }) => {
    return valuesMatched.every((value) => {
      // return true if it's within max count
      const [_, countStr, color] = value.match(/(\d+) (blue|green|red)/)
      return +countStr <= cubeCounts[color]
    })
  })
  return possible.reduce((result, game) => result + parseInt(game.gameId), 0)
}

console.log(`Part 1 = ${part1()}`)

type GameMap = Record<'blue' | 'red' | 'green', number>

const part2 = () => {
  // go through each game and collect the smallest number for each colour, create map
  const gameMaps = games.map((game) =>
    game.valuesMatched.reduce((result, cubeStr) => {
      const [_, countStr, color] = cubeStr.match(/(\d+) (blue|green|red)/)
      return {
        ...result,
        [color]: Math.max(result[color] ?? 0, +countStr),
      }
    }, {} as GameMap)
  )

  const powers = gameMaps.map((game) => game.blue * game.red * game.green)

  // sum powers
  return powers.reduce((result, power) => result + power, 0)
}

console.log(`Part 2 = ${part2()}`)
