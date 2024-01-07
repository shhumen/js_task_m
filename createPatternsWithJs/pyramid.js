function drawChristmasTree(height) {
  for (let i = 0; i < height; i++) {
    let row = '  '.repeat(height - i - 1) + ' *'.repeat(2 * i + 1)
    console.log(row)
  }
}

drawChristmasTree(5)
