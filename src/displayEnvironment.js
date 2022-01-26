const { Position } = require('./Position')

/**
 * Displays playerLives, visited position, and current position
 * @param {Environment} environment
 */
function displayEnvironment (environment) {
  console.log('lives: ' + environment.playerLives)

  for (let i = environment.height - 1; i >= 0; i--) {
    for (let j = 0; j < environment.width; j++) {
      const toWrite = environment.observableGrid[j][i]
      process.stdout.write('|' + toWrite)
    }
    process.stdout.write('|\n')
  }
}

/**
 * Displays playerLives, visited position, current position, and all mines
 * @param {Environment} environment
 */
function displayEnvironmentWithMines (environment) {
  console.log('lives: ' + environment.playerLives)

  for (let i = environment.height - 1; i >= 0; i--) {
    for (let j = 0; j < environment.width; j++) {
      let toWrite = environment.observableGrid[j][i]
      const currentPosition = new Position(j, i)
      if (environment.grid.hasMine(currentPosition)) {
        toWrite = '*'
      }
      process.stdout.write('|' + toWrite)
    }
    process.stdout.write('|\n')
  }
}

module.exports = { displayEnvironment, displayEnvironmentWithMines }
