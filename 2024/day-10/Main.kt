import java.io.File

private val locations = listOf(Pair(-1, 0), Pair(0, 1), Pair(1, 0), Pair(0, -1))

private data class Coord(val y: Int, val x: Int)

// Recursive function that takes a coord and returns a LIST of paths starting at that coord
private fun getResult(rows: List<List<Int>>, coord: Coord): List<List<Coord>> {
  val valueAtCoord = rows[coord.y][coord.x]
  val nextValue = valueAtCoord + 1

  val nextValueLocations =
          locations.map { Coord(coord.y + it.first, coord.x + it.second) }.filter {
            it.y != -1 &&
                    it.x != -1 &&
                    it.y < rows.size &&
                    it.x < rows[it.y].size &&
                    rows[it.y][it.x] == nextValue
          }

  if (nextValueLocations.size == 0) {
    // We've reached the end of this path
    return listOf(listOf(coord))
  }

  return nextValueLocations
          .map { nextLocation -> getResult(rows, nextLocation).map { listOf(coord) + it } }
          .flatten()
}

private fun getTrailheadScore(rows: List<List<Int>>, y: Int, x: Int): Int {
  return getResult(rows, Coord(y, x)).filter { it.size == 10 }.map { it.last() }.distinct().size
}

private fun getTrailheadRating(rows: List<List<Int>>, y: Int, x: Int): Int {
  return getResult(rows, Coord(y, x)).filter { it.size == 10 }.size
}

fun main() {

  // Input
  val rows = File("input.txt").readLines().map { it.toList().map { it.toString().toInt() } }

  // Part 1
  var part1 = 0
  var part2 = 0
  for (y in rows.indices) {
    for (x in rows[y].indices) {
      val value = rows[y][x]
      if (value == 0) {
        part1 += getTrailheadScore(rows, y, x)
        part2 += getTrailheadRating(rows, y, x)
      }
    }
  }

  println("Part 1 = $part1")

  // Part 2
  println("Part 2 = $part2")
}
