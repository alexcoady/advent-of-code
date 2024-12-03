import java.io.File

fun main() {
  // Input
  val lines = File("input.txt").readLines()

  val leftSide = mutableListOf<Int>()
  val rightSide = mutableListOf<Int>()

  for (row in lines) {
    val rowValues = row.split(" ").filter { it.isNotEmpty() }.map { it.toInt() }
    leftSide.add(rowValues.get(0))
    rightSide.add(rowValues.get(1))
  }

  // Part 1
  leftSide.sort()
  rightSide.sort()

  val differences = mutableListOf<Int>()

  for (i in 0..leftSide.size - 1) {
    val diff = kotlin.math.abs(leftSide.get(i) - rightSide.get(i))
    differences.add(diff)
  }

  println("Part 1 = ${differences.reduce { result, value -> result + value }}")

  // Part 2
  // Create map of value to occurrances in right hand side list
  var rightSideMap: Map<Int, Int> = rightSide.groupingBy { it }.eachCount()
  var similarityScores = mutableListOf<Int>()

  for (locationId in leftSide) {
    similarityScores.add(locationId * rightSideMap.getOrDefault(locationId, 0))
  }

  // Part 2 result
  println("Part 2 = ${similarityScores.reduce { result, value -> result + value }}")
}
