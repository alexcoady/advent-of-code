import java.io.File
import java.math.BigInteger

private data class ListElement(val value: Int? = null, val isEmpty: Boolean? = false) {
  override fun toString(): String {
    return if (value != null) value.toString() else "."
  }
}

private fun createInitialLine(initialValues: List<Int>): MutableList<ListElement> {
  val values = mutableListOf<ListElement>()
  for (mapIndex in initialValues.indices) {
    val newValues =
            List<ListElement>(initialValues[mapIndex]) {
              if (mapIndex % 2 == 0) ListElement(value = (mapIndex / 2))
              else ListElement(isEmpty = true)
            }
    values.addAll(newValues)
  }
  return values
}

private fun sumListElements(elements: List<ListElement>): BigInteger {
  var sum = BigInteger.ZERO
  for (index in elements.indices) {
    val value = elements[index].value
    sum = sum.add(BigInteger((if (value is Int) value * index else 0).toString()))
  }
  return sum
}

fun main() {

  // Input
  val input = File("input.txt").readText().map { it.toString().toInt() }

  // Part 1
  val line = createInitialLine(input)

  for (index in line.indices) {
    if (line[index].isEmpty == true) {
      // Move last item to here
      val indexOfLast = line.indexOfLast { it.value != null }
      if (indexOfLast <= index) {
        break
      }
      line.set(index, line[indexOfLast])
      line.set(indexOfLast, ListElement(isEmpty = true))
      println(line.map { it.toString() }.joinToString(separator = ""))
    }
  }

  println("Part 1 = ${sumListElements(line)}")

  // Part 2
  var part2 = "???"
  println("Part 2 = $part2")
}
