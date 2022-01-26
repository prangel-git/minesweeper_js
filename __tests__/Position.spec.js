/* eslint-env jest */

const { Position, positionAfterCommand, isPositionInBounds, isValidPath } = require('../src/Position.js')

describe('Position related functions', () => {
  it('Checks new Position', () => {
    const MyPosition = new Position(0, 0)
    expect(MyPosition.x).toBe(0)
    expect(MyPosition.y).toBe(0)
  })

  it('Position (1, 1) after command RIGHT should return (2, 1)', () => {
    const startingPosition = new Position(1, 1)
    const expectedPosition = new Position(2, 1)

    expect(positionAfterCommand(startingPosition, 'RIGHT')).toEqual(expectedPosition)
  })

  it('Position (1, 1) after command LEFT should return (0, 1)', () => {
    const startingPosition = new Position(1, 1)
    const expectedPosition = new Position(0, 1)

    expect(positionAfterCommand(startingPosition, 'LEFT')).toEqual(expectedPosition)
  })

  it('Position (1, 1) after command UP should return (1, 2)', () => {
    const startingPosition = new Position(1, 1)
    const expectedPosition = new Position(1, 2)

    expect(positionAfterCommand(startingPosition, 'UP')).toEqual(expectedPosition)
  })

  it('Position (1, 1) after command DOWN should return (1, 0)', () => {
    const startingPosition = new Position(1, 1)
    const expectedPosition = new Position(1, 0)

    expect(positionAfterCommand(startingPosition, 'DOWN')).toEqual(expectedPosition)
  })

  it('Position (1, 1) after invalid command return (1, 1)', () => {
    const startingPosition = new Position(1, 1)

    expect(positionAfterCommand(startingPosition, 'any_other_command')).toEqual(startingPosition)
  })

  it('isValidPosition validates that a few positions are inside testGrid', () => {
    const width = 8
    const height = 8
    expect(isPositionInBounds(width, height, new Position(0, 0))).toBe(true)
    expect(isPositionInBounds(width, height, new Position(7, 0))).toBe(true)
    expect(isPositionInBounds(width, height, new Position(0, 7))).toBe(true)
    expect(isPositionInBounds(width, height, new Position(7, 7))).toBe(true)
    expect(isPositionInBounds(width, height, new Position(8, 0))).toBe(false)
    expect(isPositionInBounds(width, height, new Position(0, 8))).toBe(false)
    expect(isPositionInBounds(width, height, new Position(8, 8))).toBe(false)
  })

  it('IsValidPath returns true for a path starting on bottom and ending on top', () => {
    const width = 8
    const height = 8

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
    expect(isValidPath(width, height, path)).toBe(true)
  })

  it('IsValidPath returns false for nonpaths', () => {
    const width = 8
    const height = 8

    const notAPath = [
      new Position(5, 0),
      new Position(5, 1),
      new Position(6, 1),
      new Position(6, 2),
      new Position(7, 2),
      new Position(7, 3),
      new Position(6, 4),
      new Position(5, 4),
      new Position(5, 5),
      new Position(5, 6),
      new Position(5, 7)
    ]
    expect(isValidPath(width, height, notAPath)).toBe(false)
  })
})
