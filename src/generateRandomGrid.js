const { Grid } = require('./Grid')
const { Position } = require('./Position')

/**
 *
 * @param {Number} width integer
 * @param {Number} height
 * @param {Number} mineProbability
 * @returns A Grid bounded by width and height with mines at random positions. The probability of a mine is given by mineProbability
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
