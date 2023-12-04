import { input } from './input'

interface Card {
  cardNum: number
  matches: number
}

type CardWithOccurance = Card & {
  occurances: number
}

const cards = input.split(/\n/).map<Card>((rowStr) => {
  const [cardNum, winningNumbers, ourNumbers] = rowStr.match(/((?:\d+\s*)+)/g)
  const matches = ourNumbers
    .match(/\d+/g)
    .map(Number)
    .filter((num) =>
      winningNumbers.match(/\d+/g).map(Number).includes(num)
    ).length
  return {
    cardNum: +cardNum,
    matches,
  }
})

const part1 = () =>
  cards.reduce(
    (result, card) =>
      result + (card.matches ? Math.pow(2, card.matches - 1) : 0),
    0
  )

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  // Set default occurances to 1
  const cardsWithOccurances = cards.map<CardWithOccurance>((card) => ({
    ...card,
    occurances: 1,
  }))

  // Update occurances for next rows
  cardsWithOccurances.forEach((card, index, _, nextIndex = index + 1) => {
    for (let i = nextIndex; i < nextIndex + card.matches; i += 1) {
      cardsWithOccurances[i].occurances += card.occurances
    }
  })

  // Sum it all together
  return cardsWithOccurances.reduce(
    (result, card) => result + card.occurances,
    0
  )
}

console.log(`Part 2 = ${part2()}`)
