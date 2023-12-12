import { input } from './input'

enum Node {
  Vertical = '|',
  Horizontal = '-',
  TopRight = '7',
  BottomRight = 'J',
  BottomLeft = 'L',
  TopLeft = 'F',
  Ground = '.',
  Start = 'S',
}

type Rows = Node[][]

type Location = {
  y: number
  x: number
}

enum Direction {
  Up = 'UP',
  Right = 'RIGHT',
  Down = 'DOWN',
  Left = 'LEFT',
}

const nodeOnwardDirectionMap: Record<Node, Direction[]> = {
  [Node.Vertical]: [Direction.Up, Direction.Down],
  [Node.Horizontal]: [Direction.Left, Direction.Right],
  [Node.BottomLeft]: [Direction.Up, Direction.Right],
  [Node.BottomRight]: [Direction.Up, Direction.Left],
  [Node.TopLeft]: [Direction.Down, Direction.Right],
  [Node.TopRight]: [Direction.Down, Direction.Left],
  [Node.Start]: [Direction.Up, Direction.Right, Direction.Down, Direction.Left],
  [Node.Ground]: [],
}

const nodeInwardDirectionMap: Record<Direction, Node[]> = {
  [Direction.Up]: [Node.Vertical, Node.TopRight, Node.TopLeft],
  [Direction.Right]: [Node.Horizontal, Node.TopRight, Node.BottomRight],
  [Direction.Down]: [Node.Vertical, Node.BottomLeft, Node.BottomRight],
  [Direction.Left]: [Node.Horizontal, Node.TopLeft, Node.BottomLeft],
}

const directionModifierMap = {
  [Direction.Up]: { y: -1, x: 0 },
  [Direction.Right]: { y: 0, x: 1 },
  [Direction.Down]: { y: 1, x: 0 },
  [Direction.Left]: { y: 0, x: -1 },
}

const rows: Rows = input.split(/\n/).map((rowStr) => rowStr.split('') as Node[])

function findStart(rows: Rows) {
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y]
    for (let x = 0; x < row.length; x += 1) {
      if (row[x] === Node.Start) {
        return { y, x }
      }
    }
  }
}

function getNodeValue(rows: Rows, { x, y }: Location) {
  return rows[y][x]
}

function findNextNode(rows: Rows, location: Location, prevLocation?: Location) {
  const currentNode = getNodeValue(rows, location)
  const directions = nodeOnwardDirectionMap[currentNode]

  for (let i in directions) {
    const direction = directions[i]
    const modifier = directionModifierMap[direction]
    const nodeLocation = {
      y: location.y + modifier.y,
      x: location.x + modifier.x,
    }

    if (
      nodeLocation.x === prevLocation?.x &&
      nodeLocation.y === prevLocation?.y
    ) {
      continue
    }

    if (
      nodeLocation.x < 0 ||
      nodeLocation.y < 0 ||
      nodeLocation.x >= rows[location.y].length ||
      nodeLocation.y >= rows.length
    ) {
      continue
    }

    const nodeValue = getNodeValue(rows, nodeLocation)

    // Neighbour nodes that could be accepted
    const possibleNodes = nodeInwardDirectionMap[direction]

    if (possibleNodes.includes(nodeValue)) {
      return nodeLocation
    }
  }
}

const findAllLocations = (closeLoop: boolean = false) => {
  // Find the start
  const start = findStart(rows)
  let finished = false
  const locations = [start]

  while (!finished) {
    // Go to next position
    const currentLocation = locations[locations.length - 1]
    const nextLocation = findNextNode(
      rows,
      currentLocation,
      locations[locations.length - 2]
    )
    if (!nextLocation) {
      finished = true
    } else {
      locations.push(nextLocation)
    }
  }
  return closeLoop ? locations.concat(start) : locations
}

const part1 = () => Math.ceil(findAllLocations().length / 2)

console.log(`Part 1 = ${part1()}`)

const part2 = () => {
  const locations = findAllLocations(true)

  // Shoelace algorithm
  // This will be the area up to AND INCLUDING the edges
  const area = locations.reduce((result, location, index, array) => {
    const isLast = index === array.length - 1
    if (isLast) {
      return result
    }
    const xSide = location.x * array[index + 1].y * 0.5
    const ySide = location.y * array[index + 1].x * 0.5
    return result + xSide - ySide
  }, 0)

  // Pick's law
  // Return the above area minus the edges
  return Math.abs(area) - Math.floor(locations.length / 2) + 1
}

console.log(`Part 2 = ${part2()}`)
