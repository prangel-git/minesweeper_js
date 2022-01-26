/**
 * Grid for where mines are located
 */
class Grid {
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
 * Clear the mines iin positions
 * @param {[Position]} positions
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
