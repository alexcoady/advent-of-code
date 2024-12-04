import java.io.File

internal fun getValueAtLocation(rows: List<String>, location: Pair<Int, Int>): Char? {
  return rows.getOrNull(location.first)?.getOrNull(location.second)
}

internal fun isXmas(rows: List<String>, rowIndex: Int, charIndex: Int): Int {
  val word = "XMAS"
  return (-1..1).toList()
          .map { x -> (-1..1).toList().map { y -> Pair(x, y) } }
          .flatten()
          .map { modPair ->
            word.mapIndexed { index, _ ->
              Pair(rowIndex + index * modPair.first, charIndex + index * modPair.second)
            }
          }
          .map {
            it
                    .map { getValueAtLocation(rows, it) }
                    .filter { it != null }
                    .joinToString(separator = "")
          }
          .count { it.equals(word) }
}

internal fun isCross(rows: List<String>, rowIndex: Int, charIndex: Int): Boolean {
  val word = "MAS"
  return listOf(
                  listOf(Pair(-1, -1), Pair(0, 0), Pair(1, 1)),
                  listOf(Pair(1, -1), Pair(0, 0), Pair(-1, 1))
          )
          .map { coords ->
            coords.map { modPair -> Pair(rowIndex + modPair.first, charIndex + modPair.second) }
          }
          .map {
            it
                    .map { getValueAtLocation(rows, it) }
                    .filter { it != null }
                    .joinToString(separator = "")
          }
          .count { it.equals(word) || it.equals(word.reversed()) } == 2
}

fun main() {

  // Input
  val rows = File("input.txt").readLines()

  // Part 1
  var part1 = 0
  var part2 = 0

  for (rowIndex in 0..rows.size - 1) {
    val row = rows.get(rowIndex)
    for (charIndex in 0..row.length - 1) {
      if (rows.get(rowIndex).get(charIndex) == 'X') {
        val foundCount = isXmas(rows, rowIndex, charIndex)
        part1 += foundCount
      }
      if (rows.get(rowIndex).get(charIndex) == 'A') {
        val found = isCross(rows, rowIndex, charIndex)
        if (found) {
          part2 += 1
        }
      }
    }
  }

  println("Part 1 = $part1")
  println("Part 2 = $part2")
}
