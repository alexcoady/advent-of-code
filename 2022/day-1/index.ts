import { input1 } from "./input"

const lines = input1.match(/^\d*$/gm)

// PART 1
const summedCalories = lines.reduce(
  (result, lineValue) => {
    if (lineValue.length > 0) {
      result[result.length - 1] += +lineValue
      return result
    } else {
      return result.concat(0)
    }
  },
  [0]
)

const largestSum = Math.max(...summedCalories)

console.log(`Part 1 = ${largestSum}`)

// PART 2
const orderdCalories = [...summedCalories].sort((a, b) => b - a)
const largest3 = orderdCalories.slice(0, 3)
const largest3Sum = largest3.reduce((a, b) => a + b, 0)

console.log(`Part 2 = ${largest3Sum}`)
