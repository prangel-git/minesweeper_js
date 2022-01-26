const { generatePath } = require('./generatePath')
const { generateRandomGrid } = require('./generateRandomGrid')
const { positionAfterCommand, isPositionInBounds } = require('./Position')

/**
 * Keeps the state of a minesweep game
 */
class Environment {
  /**
   * Generates an initial minesweep state
   * @param {integer} width
   * @param {integer} height
   * @param {number} mineProbability: Probability of finding a mine outside the solution path.
   */
  constructor (width, height, mineProbability) {
    this.width = width
    this.height = height

    this.grid = generateRandomGrid(width, height, mineProbability)
    this.path = generatePath(width, height)
    this.grid.clearMines(this.path)

    this.playerPosition = this.path[0]
    this.playerLives = 5

    this.isVictory = false
    this.gameLog = [Object.assign({}, this.playerPosition)]

    this.observableGrid = new Array(width).fill(0).map(() => new Array(height).fill(' '))
    this.updateObservableGrid(this.playerPosition, 'O')
  }

  /**
   * Updates environment after giving a command
   * @param {UP, DOWN, RIGHT, LEFT} command Command given by the player
   */
  updateAfterCommand (command) {
    const nextPosition = positionAfterCommand(this.playerPosition, command)
    if (isPositionInBounds(this.width, this.height, nextPosition)) {
      this.gameLog.push(nextPosition)
      if (this.grid.hasMine(nextPosition)) {
        this.playerLives = this.playerLives - 1
        this.updateObservableGrid(nextPosition, '*')
      } else {
        this.updateObservableGrid(this.playerPosition, 'o')
        this.updateObservableGrid(nextPosition, 'O')
        this.playerPosition = nextPosition

        if (this.playerPosition.y === (this.grid.width - 1)) {
          this.isVictory = true
        }
      }
    }
  }

  /**
   * Overrides a position of the observable grid.
   * @param {Position} position to update
   * @param {'*', 'o', 'O'} newState in that position
   */
  updateObservableGrid (position, newState) {
    this.observableGrid[position.x][position.y] = newState
  }

  /**
   *
   * @returns Observable state of the environment
   */
  getObservableState () {
    return { playerLives: this.playerLives, gridState: this.observableGrid, height: this.grid.height, width: this.grid.width }
  }
}

module.exports = {
  Environment
}
