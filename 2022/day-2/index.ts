import { input } from "./input"

// Process input into nested array
const rounds = input.split("\n").map((roundStr) => roundStr.split(" "))

// Utils
const sum = (values: number[]) =>
  values.reduce((result, value) => result + value, 0)

enum Shape {
  Rock,
  Paper,
  Scissors,
}

enum Result {
  Lose,
  Draw,
  Win,
}

// Weights
const ShapeWeight = {
  [Shape.Rock]: 1,
  [Shape.Paper]: 2,
  [Shape.Scissors]: 3,
}

const Opponent = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
}

const User = {
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors,
}

const Points = {
  [Result.Lose]: 0,
  [Result.Draw]: 3,
  [Result.Win]: 6,
}

const pointsFromRound = (theirShape: Shape, myShape: Shape) => {
  if (theirShape === myShape) return Points[Result.Draw]
  if (
    (theirShape === Shape.Rock && myShape === Shape.Scissors) ||
    (theirShape === Shape.Paper && myShape === Shape.Rock) ||
    (theirShape === Shape.Scissors && myShape === Shape.Paper)
  )
    return Points[Result.Lose]

  return Points[Result.Win]
}

const scoreFromRound = (theirShape: Shape, myShape: Shape) => {
  const points = pointsFromRound(theirShape, myShape)
  return points + ShapeWeight[myShape]
}

const results = rounds.map((roundValues) =>
  scoreFromRound(Opponent[roundValues[0]], User[roundValues[1]])
)

console.log(`Part 1 = ${sum(results)}`)

// Part 2

const ResultRequired = {
  X: Result.Lose,
  Y: Result.Draw,
  Z: Result.Win,
}

const getShapeForResult = (
  theirShape: Shape,
  requiredResult: Result.Lose | Result.Win | Result.Draw
) => {
  if (requiredResult === Result.Draw) return theirShape
  if (requiredResult === Result.Win) {
    return {
      [Shape.Rock]: Shape.Paper,
      [Shape.Paper]: Shape.Scissors,
      [Shape.Scissors]: Shape.Rock,
    }[theirShape]
  }
  return {
    [Shape.Rock]: Shape.Scissors,
    [Shape.Paper]: Shape.Rock,
    [Shape.Scissors]: Shape.Paper,
  }[theirShape]
}

const resultsPart2 = rounds.map((roundValues) => {
  const theirShape = Opponent[roundValues[0]]
  const requiredResult = ResultRequired[roundValues[1]]
  const myShape = getShapeForResult(theirShape, requiredResult)
  return scoreFromRound(theirShape, myShape)
})

console.log(`Part 2 = ${sum(resultsPart2)}`)
