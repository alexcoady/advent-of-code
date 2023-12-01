import { input } from './input'

enum Dir {
  U = 'U',
  R = 'R',
  D = 'D',
  L = 'L',
}

const commands = input
  .split('\n')
  .map((commandStr) =>
    commandStr
      .split(' ')
      .map((value) => (isNaN(+value) ? (value as Dir) : +value))
  ) as any as Array<[Dir, number]>

type Coord = { x: number; y: number }
const hPos: Coord[] = [{ x: 0, y: 0 }]
const tPos: Coord[] = [{ x: 0, y: 0 }]

const moveInDir = (coordArr: Coord[], dir: Dir) => {
  let x = 0
  let y = 0
  switch (dir) {
    case Dir.D:
      y = 1
      break
    case Dir.L:
      x = -1
      break
    case Dir.R:
      x = 1
      break
    case Dir.U:
      y = -1
      break
  }
  const prev = coordArr[coordArr.length - 1]
  coordArr.push({ x: prev.x + x, y: prev.y + y })
}

const clampToAbs = (value: number, size: number) =>
  Math.max(size * -1, Math.min(size, value))

const moveTail = () => {
  const tail = tPos[tPos.length - 1]
  const head = hPos[hPos.length - 1]
  if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1) {
    // Close enough
    return
  }
  const diffX = clampToAbs(head.x - tail.x, 1)
  const diffY = clampToAbs(head.y - tail.y, 1)
  tPos.push({ x: tail.x + diffX, y: tail.y + diffY })
}

for (const command of commands) {
  // Make individual moves
  for (let i = 0; i < command[1]; i += 1) {
    moveInDir(hPos, command[0])
    moveTail()
  }
}

const uniquePositions = new Set(tPos.map((coord) => JSON.stringify(coord)))

console.log(`Part 1 = ${uniquePositions.size}`)
