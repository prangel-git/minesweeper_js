/* eslint-env jest */

const { Environment } = require('../src/Environment')
const { Position } = require('../src/Position')

function mockEmtptyEnvironment (width, height) {
  const environment = new Environment(width, height, 0)
  environment.playerPosition = new Position(0, 0)
  environment.gameLog = [new Position(0, 0)]
  environment.observableGrid = new Array(width).fill(0).map(() => new Array(height).fill('U'))
  environment.observableGrid[0][0] = 'O'
  return environment
}

function mockEasyEnvironment (width, height) {
  const environment = new Environment(width, height, 0)
  environment.playerPosition = new Position(0, 0)
  environment.gameLog = [new Position(0, 0)]
  environment.observableGrid = new Array(width).fill(0).map(() => new Array(height).fill('U'))
  environment.observableGrid[0][0] = 'O'

  environment.grid.mines = Array.from(Array(width), () => new Array(height).fill(true))
  for (let i = 0; i < height; i++) {
    const position = new Position(0, i)
    environment.grid.clearMine(position)
  }

  return environment
}

describe('Environment keeps the information of a current game', () => {
  const width = 8
  const height = 8

  it('updateAction updates the log and player position', () => {
    const environment = mockEmtptyEnvironment(width, height)

    environment.updateAfterCommand('UP')
    expect(environment.playerPosition.x).toBe(0)
    expect(environment.playerPosition.y).toBe(1)

    environment.updateAfterCommand('RIGHT')
    expect(environment.playerPosition.x).toBe(1)
    expect(environment.playerPosition.y).toBe(1)

    environment.updateAfterCommand('DOWN')
    expect(environment.playerPosition.x).toBe(1)
    expect(environment.playerPosition.y).toBe(0)

    environment.updateAfterCommand('LEFT')
    expect(environment.playerPosition.x).toBe(0)
    expect(environment.playerPosition.y).toBe(0)
  })

  it('check that log saves the attempt of each player', () => {
    const environment = mockEmtptyEnvironment(width, height)

    const expectedGameLog = [
      new Position(0, 0),
      new Position(0, 1),
      new Position(1, 1),
      new Position(1, 0),
      new Position(0, 0)
    ]

    environment.updateAfterCommand('UP')
    environment.updateAfterCommand('RIGHT')
    environment.updateAfterCommand('DOWN')
    environment.updateAfterCommand('LEFT')

    expect(environment.gameLog.length).toBe(expectedGameLog.length)

    for (let i = 0; i < expectedGameLog.length; i++) {
      const expected = expectedGameLog[i]
      const realized = environment.gameLog[i]

      expect(realized.x).toBe(expected.x)
      expect(realized.y).toBe(expected.y)
    }
  })

  it('Checks playerLives does not update when player moves to unmined position', () => {
    const environment = mockEasyEnvironment(width, height)

    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('UP')
    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('DOWN')
    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('LEFT')
    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('RIGHT')
    expect(environment.playerLives).toBe(4)
  })

  it('Checks playerLives does not update when player moves out of bound', () => {
    const environment = mockEasyEnvironment(width, height)

    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('LEFT')
    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('DOWN')
    expect(environment.playerLives).toBe(5)
  })

  it('Checks playerLives decreases when player moves to a mine', () => {
    const environment = mockEasyEnvironment(width, height)

    expect(environment.playerLives).toBe(5)
    environment.updateAfterCommand('RIGHT')
    expect(environment.playerLives).toBe(4)
  })

  it('Checks isVictory variable gets updated on mockEasyEnvironment', () => {
    const environment = mockEasyEnvironment(width, height)

    expect(environment.isVictory).toBe(false)
    for (let i = 0; i < height - 1; i++) {
      environment.updateAfterCommand('UP')
    }
    expect(environment.isVictory).toBe(true)
  })

  it('getObservableState returns the observable state of an environment', () => {
    const environment = mockEmtptyEnvironment(width, height)

    expect(environment.getObservableState().playerLives).toBe(5)
    expect(environment.getObservableState().gridState[0][0]).toBe('O')

    environment.updateAfterCommand('UP')

    expect(environment.getObservableState().playerLives).toBe(5)
    expect(environment.getObservableState().gridState[0][0]).toBe('o')
    expect(environment.getObservableState().gridState[0][1]).toBe('O')
  })
})
