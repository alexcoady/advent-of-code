import { input } from './input'

interface Hand {
  hand: string
  bid: number
}

const values = input
  .split(/\n/)
  .map((row) => row.split(' '))
  .map<Hand>((row) => ({
    hand: row[0],
    bid: parseInt(row[1]),
  }))

const handToMatches = (hand: string, jokerMode: boolean) => {
  const ratingMap = hand.split('').reduce(
    (result, card) => ({
      ...result,
      [card]: (result[card] ?? 0) + 1,
    }),
    {}
  )

  if (jokerMode && typeof ratingMap['J'] === 'number') {
    const values = Object.values<number>(ratingMap).sort().reverse()
    if (values[0] === 5 || values.length === 1) {
      return values
    }
    if (values[0] === ratingMap['J']) {
      // Don't add joker points to joker if they're the largest number
      values[1] += ratingMap['J']
    } else {
      values[0] += ratingMap['J']
    }
    values.splice(values.indexOf(ratingMap['J']), 1)
    return values
  }

  return Object.values<number>(ratingMap).sort().reverse()
}

const compareTypes = (a: string, b: string, jokerMode: boolean) => {
  const aMatches = handToMatches(a, jokerMode)
  const bMatches = handToMatches(b, jokerMode)
  const lengthDiff = bMatches.length - aMatches.length

  if (lengthDiff !== 0) {
    return lengthDiff
  }

  return aMatches[0] - bMatches[0]
}

const compareHands = (a: string, b: string, rankOrder: string[]) => {
  for (let i = 0; i <= a.length - 1; i += 1) {
    const aValue = rankOrder.indexOf(a[i])
    const bValue = rankOrder.indexOf(b[i])
    if (aValue !== bValue) {
      return aValue - bValue
    }
  }
  return 0
}

const sortByHand = (
  a: Hand,
  b: Hand,
  rankOrder: string[],
  jokerMode: boolean = false
) => {
  const typeEquality = compareTypes(a.hand, b.hand, jokerMode)
  if (typeEquality !== 0) {
    return typeEquality
  }
  const handEquality = compareHands(a.hand, b.hand, rankOrder)
  return handEquality
}

const part1 = () => {
  const rankOrder = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
  ]
  const part1Values = [...values]
  const sorted = part1Values.sort((a, b) => sortByHand(a, b, rankOrder))
  return sorted.reduce(
    (result, hand, index) => result + hand.bid * (index + 1),
    0
  )
}

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const rankOrder = [
    'J',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'Q',
    'K',
    'A',
  ]
  const part2Values = [...values]
  const sorted = part2Values.sort((a, b) => sortByHand(a, b, rankOrder, true))
  return sorted.reduce(
    (result, hand, index) => result + hand.bid * (index + 1),
    0
  )
}

console.log(`Part 2 = ${part2()}`)
