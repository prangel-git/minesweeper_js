/**
 * Reads an action from the keyboard
 * @param {Object} observedState of the game
 * @returns The action taken by the player
 */
async function playerAction (observedState) {
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf8')

  return new Promise(resolve => {
    stdin.once('data', (key) => {
      let action = 'INVALID'
      if (key === '\u001B\u005B\u0041') {
        action = 'UP'
      } else if (key === '\u001B\u005B\u0043') {
        action = 'RIGHT'
      } else if (key === '\u001B\u005B\u0042') {
        action = 'DOWN'
      } else if (key === '\u001B\u005B\u0044') {
        action = 'LEFT'
      } else {
        action = 'INVALID'
      }
      process.stdin.pause()
      resolve(action)
    })
  }
  )
}

module.exports = {
  playerAction
}
