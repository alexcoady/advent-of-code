import java.io.File

// Consts
internal val GUARD = '^'
internal val OBSTACLE = '#'
internal val EMPTY = '.'
internal val directionMap =
        mapOf(
                Pair(-1, 0) to Pair(0, 1),
                Pair(0, 1) to Pair(1, 0),
                Pair(1, 0) to Pair(0, -1),
                Pair(0, -1) to Pair(-1, 0)
        )

internal fun isCoordOffMap(mapRows: List<CharArray>, coord: Pair<Int, Int>): Boolean {
  return coord.first == -1 ||
          coord.second == -1 ||
          coord.first >= mapRows.size ||
          coord.second >= mapRows[0].size
}

internal data class HistoryRecord(val location: Pair<Int, Int>, val direction: Pair<Int, Int>)

internal data class MapResult(val history: Set<HistoryRecord>, val didLoop: Boolean)

internal fun traverseMap(mapRows: List<CharArray>): MapResult {
  // Start point
  var guardRowIndex = mapRows.indexOfFirst { it.contains(GUARD) }
  var guardColumnIndex = mapRows[guardRowIndex].indexOf(GUARD)
  var guard = Pair(guardRowIndex, guardColumnIndex)
  var direction = Pair(-1, 0)

  // Track visited locations
  val history = mutableSetOf(HistoryRecord(guard, direction))

  while (true) {
    val nextLocation = Pair(guard.first + direction.first, guard.second + direction.second)
    if (isCoordOffMap(mapRows, nextLocation)) {
      break
    }

    if (history.contains(HistoryRecord(nextLocation, direction))) {
      return MapResult(history, true)
    }

    if (mapRows[nextLocation.first][nextLocation.second] == OBSTACLE) {
      // Turn right
      direction = directionMap[direction] ?: direction
    } else {
      // Move into next locaton
      guard = nextLocation
      history.add(HistoryRecord(guard, direction))
    }
  }

  return MapResult(history, false)
}

fun main() {

  // Input
  val mapRows = File("input.txt").readLines().map { it.toCharArray() }

  // Part 1
  val part1 = traverseMap(mapRows).history.map { it.location }.distinct().size

  // Part 2
  var part2 = 0
  for (rowIndex in mapRows.indices) {
    for (charIndex in mapRows[rowIndex].indices) {
      val char = mapRows[rowIndex][charIndex]
      if (char == EMPTY) {
        mapRows[rowIndex][charIndex] = OBSTACLE
        val result = traverseMap(mapRows)
        if (result.didLoop) {
          part2 += 1
        }
        mapRows[rowIndex][charIndex] = EMPTY
      }
    }
  }

  println("Part 1 = $part1")
  println("Part 2 = $part2")
}
