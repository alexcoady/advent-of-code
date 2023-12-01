import { input } from './input'

const part1 = () => {
  const numbersOnly = input.split(/\n/).map((str) => str.match(/\d/g))
  return numbersOnly.reduce(
    (result, line) => result + parseInt(`${line[0]}${line[line.length - 1]}`),
    0
  )
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const asNumStr = (value: string) =>
    ({
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
    }[value] ?? value)

  /**
   * hate this but the value is either at index 0 or 1 depending if it's a group or not
   */
  const extractRegexValue = (regExMatch: RegExpMatchArray) =>
    regExMatch[0].length > 0 ? regExMatch[0] : regExMatch[1]

  return input
    .split(/\n/)
    .map((str) => {
      const matches = Array.from(
        str.matchAll(/\d|(?=(one|two|three|four|five|six|seven|eight|nine))/g)
      )
      return [matches[0], matches[matches.length - 1]]
        .map((regexMatch) => asNumStr(extractRegexValue(regexMatch)))
        .join('')
    })
    .reduce((result, rowValue) => result + parseInt(rowValue), 0)
}

console.log(`Part 2 = ${part2()}`)
