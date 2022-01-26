/* eslint-env jest */

const { Grid } = require('../src/Grid.js')
const { Position } = require('../src/Position.js')

function mockFilledGrid (width, height) {
  const mineGrid = new Grid(width, height)
  mineGrid.mines = Array.from(Array(width), () => new Array(height).fill(true))
  return mineGrid
}

describe('Grid object tests for 8 by 8 grid', () => {
  const width = 8
  const height = 8

  it('Generates grid from a given width and height', () => {
    const mineGrid = new Grid(width, height)
    expect(mineGrid.width).toBe(width)
    expect(mineGrid.height).toBe(height)
    expect(mineGrid.mines.length).toBe(width)
    for (let i = 0; i < mineGrid.mines.length; i++) {
      expect(mineGrid.mines[i].length).toBe(height)
    }
  })

  it('setMine puts a mine on a valid Position', () => {
    const mineGrid = new Grid(width, height)
    const x = 1
    const y = 2
    const position = new Position(x, y)
    mineGrid.setMine(position)
    expect(mineGrid.mines[x][y]).toBe(true)
  })

  it('clearMine clears a mine from a valid Position', () => {
    const mineGrid = mockFilledGrid(width, height)
    const x = 1
    const y = 2
    const position = new Position(x, y)
    mineGrid.clearMine(position)
    expect(mineGrid.mines[x][y]).toBe(false)
  })

  it('hasMine returns true in a mined position', () => {
    const mineGrid = new Grid(width, height)
    const x = 1
    const y = 2
    const position = new Position(x, y)
    mineGrid.setMine(position)
    expect(mineGrid.hasMine(position)).toBe(true)
  })

  it('hasMine returns false in a clear position', () => {
    const mineGrid = mockFilledGrid(width, height)
    const x = 1
    const y = 2
    const position = new Position(x, y)
    mineGrid.clearMine(position)
    expect(mineGrid.hasMine(position)).toBe(false)
  })

  it('Removes mines from fully mined grid', () => {
    const path = [
      new Position(5, 0),
      new Position(5, 1),
      new Position(6, 1),
      new Position(6, 2),
      new Position(7, 2),
      new Position(7, 3),
      new Position(6, 3),
      new Position(6, 4),
      new Position(5, 4),
      new Position(5, 5),
      new Position(5, 6),
      new Position(5, 7)
    ]

    const mineGrid = mockFilledGrid(width, height)

    mineGrid.clearMines(path)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const position = new Position(i, j)
        const doesNotInclude = !path.some(pos => pos.x === i && pos.y === j)
        expect(mineGrid.hasMine(position)).toBe(doesNotInclude)
      }
    }
  })

  it('mockFilledGrid produces a completely filled grill', () => {
    const mineGrid = mockFilledGrid(width, height)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const position = new Position(i, j)
        expect(mineGrid.hasMine(position)).toBe(true)
      }
    }
  })
})
