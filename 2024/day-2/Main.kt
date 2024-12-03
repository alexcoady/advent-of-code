import java.io.File

fun isSafe(numbers: List<Int>): Boolean {
  return numbers.zipWithNext().all { (a, b) -> a > b && a - b <= 3 } ||
          numbers.zipWithNext().all { (a, b) -> a < b && b - a <= 3 }
}

fun main() {
  // Input
  val lines = File("input.txt").readLines().map { it.split(' ').map { it.toInt() } }

  // Part 1
  val part1SafeReports = lines.filter { isSafe(it) }
  println("Part 1 = ${part1SafeReports.size}")

  // Part 2
  var count = 0
  for (line in lines) {

    if (!isSafe(line)) {

      // Brute force to find safe variant of line
      for (index in 0..line.size - 1) {
        val lineWithoutIndex = line.toMutableList()
        lineWithoutIndex.removeAt(index)
        if (isSafe(lineWithoutIndex)) {
          count += 1
          break
        }
      }
    } else {
      count += 1
    }
  }

  println("Part 2 = $count")
}
