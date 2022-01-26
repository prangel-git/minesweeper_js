/* eslint-env jest */

const { generatePath } = require('../src/generatePath.js')
const { isValidPath } = require('../src/Position')

describe('Tests for generateValidPath', () => {
  const width = 8
  const height = 8
  it('generate several valid paths from bottom to top', () => {
    const N = 20

    for (let index = 0; index < N; index++) {
      const path = generatePath(width, height)
      expect(isValidPath(width, height, path)).toBe(true)
    }
  })
})
