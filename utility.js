// * Deletes the current line on which cursor is currently pointing
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    })
  })
}

// * Moves the current cursor position
const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    })
  })
}

module.exports = {
  clearLine,
  moveCursor
}