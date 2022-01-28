/**
 * Creates an (x,y) position
 * @param {Number} x an integer containing x coordinate
 * @param {Number} y an integer containing y coordiante
 */
function Position (x, y) {
  this.x = x
  this.y = y
}

/**
 *
 * @param {Position} position
 * @param {String} command can be 'UP, 'DOWN', 'LEFT', 'RIGHT'
 * @returns The result of moving from position after receiving command
 */
function positionAfterCommand (position, command) {
  switch (command) {
    case 'RIGHT':
      return new Position(position.x + 1, position.y)
    case 'LEFT':
      return new Position(position.x - 1, position.y)
    case 'UP':
      return new Position(position.x, position.y + 1)
    case 'DOWN':
      return new Position(position.x, position.y - 1)
    default:
      return new Position(position.x, position.y)
  }
}

/**
 *
 * @param {Position} positionA
 * @param {Position} positionB
 * @returns Taxicab distance between positionA and positionB
 */
function taxicabDistance (positionA, positionB) {
  return Math.abs(positionA.x - positionB.x) + Math.abs(positionA.y - positionB.y)
}

/**
 *
 * @param {Position} positionA
 * @param {Position} positionB
 * @returns true iff the two positions are neighbours
 */
function areNeighbours (positionA, positionB) {
  return taxicabDistance(positionA, positionB) === 1
}

/**
 *
 * @param {Position[]} positions A list of positions to check.
 * @returns true iff the positions form a path
 */
function isPath (positions) {
  let areConsecutivePositionsNeighbours = true

  for (let i = 1; i < positions.length; i++) {
    const currentPosition = positions[i]
    const previousPosition = positions[i - 1]
    areConsecutivePositionsNeighbours = areConsecutivePositionsNeighbours && areNeighbours(currentPosition, previousPosition)
  }

  return areConsecutivePositionsNeighbours
}

/**
 *
 * @param {Number} width an integer
 * @param {Number} height an integer
 * @param {Position[]} positions a list of positions
 * @returns true iff the positions for a valid path in the grid
 */
function isValidPath (width, height, positions) {
  const startPosition = positions[0]
  const endPosition = positions.at(-1)

  const isStartPositionInFirstRow = startPosition.y === 0
  const isEndPositionInLastRow = endPosition.y === (height - 1)

  const arePositionsAPath = isPath(positions)

  const arePositionsBounded = ArePositionsBounded(positions, width, height)

  return isStartPositionInFirstRow && isEndPositionInLastRow && arePositionsAPath && arePositionsBounded
}

/**
   *
   * @param {Number} width an integer
   * @param {Number} height an integer
   * @param {Position} position
   * @returns true iff the position is in the bounds of width and height
   */
function isPositionInBounds (width, height, position) {
  return position.x >= 0 && position.x < width && position.y >= 0 && position.y < height
}

/**
 *
 * @param {Position[]} positions
 * @param {Number} width
 * @param {Number} height
 * @returns true iff all the positions are bounded by width and height
 */
function ArePositionsBounded (positions, width, height) {
  let arePositionsInBounds = true
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i]
    arePositionsInBounds = arePositionsInBounds && isPositionInBounds(width, height, position)
  }
  return arePositionsInBounds
}

module.exports = {
  Position,
  positionAfterCommand,
  isPositionInBounds,
  isValidPath
}
