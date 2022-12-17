import { input } from './input'

const lines = input.split('\n')

const pointer = ['/']

const structure = {
  name: '/',
  contents: [],
}

const getDirectory = (pointer: string[]) => {
  let result = structure
  if (pointer.length === 1) {
    return structure
  }
  for (let i = 1; i < pointer.length; i += 1) {
    result = result.contents.find(({ name }) => name === pointer[i])
  }
  return result
}

const addDirectoryContent = (index: number) => {
  for (let i = index; i < lines.length; i += 1) {
    const line = lines[i]
    const directory = getDirectory(pointer)
    const dir = line.match(/(\d+) (.+)/)
    const file = line.match(/dir (.+)/)

    if (dir) {
      directory.contents.push({
        name: dir[2],
        size: parseInt(dir[1]),
      })
    } else if (file) {
      directory.contents.push({
        name: file[1],
        contents: [],
      })
    } else {
      break
    }
  }
}

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i]
  const command = line.match(/^\$\s(cd|ls)(?: (.+))?/)
  if (!command) continue
  switch (command[1]) {
    case 'cd': {
      const location = command[2]
      if (location === '..') {
        pointer.pop()
      } else if (location === '/') {
        pointer.splice(1)
      } else {
        pointer.push(location)
      }
      break
    }
    case 'ls': {
      addDirectoryContent(i + 1)
      break
    }
  }
}

// Go through all directories and count size
const getContentSize = (contents: any[]) => {
  return (contents || []).reduce((result, item) => {
    if (item.size) {
      result += item.size
    } else {
      result += getContentSize(item.contents)
    }
    return result
  }, 0)
}

const resultMap: Record<string, number> = {}

const traverseDirectories = (path: string, directory: any) => {
  resultMap[path] = getContentSize(directory.contents)
  // Recusive loop
  directory.contents?.forEach((d) => {
    traverseDirectories(path + d.name + '/', d)
  })
}

// Build size mapping
traverseDirectories('/', structure)

const resultPart1 = Object.values(resultMap)
  .filter((size) => size <= 100000)
  .reduce((result, value) => result + value, 0)

console.log(`Part 1 = ${resultPart1}`)

// Part 2

const FREE_SPACE_REQUIRED = 30000000
const TOTAL_STORAGE = 70000000
const currentMemoryUsed = Object.values(resultMap)
  .filter(Boolean)
  .sort((a, b) => b - a)[0]
const currentFreeSpace = TOTAL_STORAGE - currentMemoryUsed
const spaceToFreeUp = FREE_SPACE_REQUIRED - currentFreeSpace

const resultPart2 = Object.values(resultMap)
  .filter((size) => size >= spaceToFreeUp)
  .sort((a, b) => a - b)[0]

console.log(`Part 2 = ${resultPart2}`)
