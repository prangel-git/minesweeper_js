/* eslint-env jest */

const { generateRandomGrid } = require('../src/generateRandomGrid.js')

describe('Generate random mine field', () => {
  const { Position } = require('../src/Position.js')

  const width = 8
  const height = 8

  it('Creates grid full of mines', () => {
    const mineGrid = generateRandomGrid(width, height, 1)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const position = new Position(i, j)
        expect(mineGrid.hasMine(position)).toBe(true)
      }
    }
  })

  it('Creates grid with no mines', () => {
    const mineGrid = generateRandomGrid(width, height, 0)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const position = new Position(i, j)
        expect(mineGrid.hasMine(position)).toBe(false)
      }
    }
  })
})
