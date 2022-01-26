const { Grid } = require('./Grid')
const { Position } = require('./Position')

/**
 *
 * @param {Integer} width
 * @param {Integer} height
 * @param {Number} mineProbability
 * @returns A Grid with mines at random positions.
 */
function generateRandomGrid (width, height, mineProbability) {
  const grid = new Grid(width, height)
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const position = new Position(i, j)
      const randomNumber = Math.random()
      if (randomNumber < mineProbability) {
        grid.setMine(position)
      } else {
        grid.clearMine(position)
      }
    }
  }
  return grid
}

module.exports = { generateRandomGrid }
