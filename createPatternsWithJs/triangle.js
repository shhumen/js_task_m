function drawTriangle(rows) {
  for (let i = 0; i < rows; i++) {
    let row = ''
    for (let j = 0; j <= i; j++) {
      row += ' * '
    }
    console.log(row)
  }
}

drawTriangle(8)
