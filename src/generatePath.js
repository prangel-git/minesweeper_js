const { getRandomInt } = require('./Utils.js')
const { Position, positionAfterCommand, isPositionInBounds } = require('./Position')

/**
 * Creates a random path from the bottom to the top of the grid
 * @param {Integer} width integer
 * @param {Integer} height integer
 * @returns a valid solution path in the bounds given by with and height
 */
function generatePath (width, height) {
  const validPath = [new Position(getRandomInt(width), 0)]
  const actions = ['UP', 'LEFT', 'RIGHT']
  while (!(validPath.at(-1).y === height - 1)) {
    const randCommand = actions[getRandomInt(3)]
    const possibleNextPosition = positionAfterCommand(validPath.at(-1), randCommand)
    if (isPositionInBounds(width, height, possibleNextPosition)) {
      validPath.push(possibleNextPosition)
    }
  }

  return validPath
}

module.exports = { generatePath }
