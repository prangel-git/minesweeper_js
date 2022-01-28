const { displayEnvironment, displayEnvironmentWithMines } = require('./displayEnvironment')
const { Environment } = require('./Environment')
const { playerAction } = require('./playerAction')

/**
 * Creates a new minesweepers game
 * @param {Number} width of the grid
 * @param {Number} height of the grid
 * @param {Number} mineProbability a number from 0 to 1 with the probability that an element of the grid is a mine
 */
async function minesweeperGame (width, height, mineProbability) {
  const environment = new Environment(width, height, mineProbability)

  while (environment.playerLives > 0 && !environment.isVictory) {
    displayEnvironment(environment)

    await playerAction(environment.getObservableState())
      .then(
        action => environment.updateAfterCommand(action)
      )
  }

  displayEnvironmentWithMines(environment)

  if (environment.isVictory) {
    console.log('you WIN')
    return 'playerWins'
  } else {
    console.log('you LOSE')
    return 'playerLoses'
  }
}

module.exports = { minesweeperGame }
