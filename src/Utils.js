/**
 *
 * @param {integer} max
 * @returns A random integer between 0 and (max - 1)
 */
function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

module.exports = { getRandomInt }
