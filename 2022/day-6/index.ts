import { input } from './input'

const getCharAfterMarker = (markerLength: number) => {
  for (
    let i = markerLength - 1;
    i < input.length - (markerLength - 1);
    i += 1
  ) {
    const items = input.slice(i, i + markerLength)
    const uniq = [...new Set(items)]
    if (uniq.length === markerLength) {
      return i + markerLength
    }
  }
}

console.log(`Part 1 = ${getCharAfterMarker(4)}`)
console.log(`Part 2 = ${getCharAfterMarker(14)}`)
