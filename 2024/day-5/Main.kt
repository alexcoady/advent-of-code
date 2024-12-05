import java.io.File

internal fun sumMiddleValues(updates: List<List<Int>>): Int {
  return updates.map { it[it.size / 2] }.fold(0) { result, value -> result + value }
}

fun main() {

  // Input
  val rawText = File("input.txt").readText()
  val rules =
          Regex("^(\\d+)\\|(\\d+)$", RegexOption.MULTILINE)
                  .findAll(rawText)
                  .map { Pair(it.groupValues.get(1).toInt(), it.groupValues.get(2).toInt()) }
                  .toList()

  val updates =
          Regex("^((\\d+)(,|$))+", RegexOption.MULTILINE)
                  .findAll(rawText)
                  .map { it.value }
                  .toList()
                  .map { it.split(",").map { it.toInt() } }

  val correctUpdates =
          updates.filter {
            it.zipWithNext().all { updatePair -> rules.any { rule -> updatePair == rule } }
          }

  val incorrectUpdates = updates.filter { !correctUpdates.contains(it) }

  // Part 1
  val part1 = sumMiddleValues(correctUpdates)

  // Part 2
  val valuesFollowingKey =
          rules.fold(mutableMapOf<Int, MutableList<Int>>()) { result, rule ->
            val current = result.get(rule.first)
            if (current != null) current.add(rule.second)
            else result.set(rule.first, mutableListOf(rule.second))
            result
          }

  val newlySortedUpdates = mutableListOf<List<Int>>()

  for (update in incorrectUpdates) {
    val sortedUpdate = mutableListOf<Int>(update[0])
    for (incomingNumber in update.subList(1, update.size)) {
      val numbersWhichFollowIncoming = valuesFollowingKey.get(incomingNumber)
      for (sortedIndex in 0..sortedUpdate.size - 1) {
        val currentSortedNumber = sortedUpdate[sortedIndex]
        val incomingBeforeCurrent = numbersWhichFollowIncoming?.contains(currentSortedNumber)
        if (incomingBeforeCurrent == true) {
          // Put the new number in place of the current on (pushing current to right)
          sortedUpdate.add(sortedIndex, incomingNumber)
          break
        }
        if (sortedIndex == sortedUpdate.size - 1) {
          // Add to end of list
          sortedUpdate.add(incomingNumber)
        }
      }
    }
    newlySortedUpdates.add(sortedUpdate)
  }

  var part2 = sumMiddleValues(newlySortedUpdates)

  println("Part 1 = $part1")
  println("Part 2 = $part2")
}
