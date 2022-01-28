/**
 * Grid for where mines are located
 */
class Grid {
  /**
   * Builds an empty grid with a given width and height.
   * @param {Number} width integer
   * @param {Number} height integer
   */
  constructor (width, height) {
    this.width = width
    this.height = height
    this.mines = Array.from(Array(width), () => new Array(height).fill(false))
  }

  /**
   * Puts a mine in a given position
   * @param {Position} position
   */
  setMine (position) {
    this.mines[position.x][position.y] = true
  }

  /**
   * Clears a mine from a given position
   * @param {Position} position
   */
  clearMine (position) {
    this.mines[position.x][position.y] = false
  }

  /**
 * Clear the mines in positions
 * @param {Position[]} positions An array of positions
 */
  clearMines (positions) {
    positions.forEach(pos => {
      this.clearMine(pos)
    })
  }

  /**
   *
   * @param {Position} position
   * @returns true iff there is a mine in a position
   */
  hasMine (position) {
    return this.mines[position.x][position.y]
  }
}

module.exports = {
  Grid
}
