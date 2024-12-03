import java.io.File

fun extractPairs(matchResult: MatchResult): Pair<Int, Int> {
  val (first, second) = matchResult.destructured
  return first.toInt() to second.toInt()
}

fun main() {
  // Input
  val input = File("input.txt").readText()

  val multiplicationRegex = Regex("mul\\((\\d+),(\\d+)\\)")

  // Part 1
  val part1Multiplications = multiplicationRegex.findAll(input).map { extractPairs(it) }
  val part1 = part1Multiplications.fold(0) { result, pair -> result + (pair.first * pair.second) }
  println("Part 1 = $part1")

  // Part 2
  val removeRegex = Regex("(?:don't\\(\\))(\n|.*?)(?:do(?!n't)|$)", RegexOption.MULTILINE)
  val inputWithoutDonts = removeRegex.replace(Regex("\\n").replace(input, ""), "")

  val part2Multiplications = multiplicationRegex.findAll(inputWithoutDonts).map { extractPairs(it) }
  val part2 = part2Multiplications.fold(0) { result, pair -> result + (pair.first * pair.second) }
  println("Part 2 = $part2")
}
