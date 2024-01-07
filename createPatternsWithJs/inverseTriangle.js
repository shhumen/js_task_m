function drawInverseTriangle(rows) {
  for (let i = rows; i >= 1; i--) {
    let row = ''
    for (let j = 1; j <= i; j++) {
      row += ' * '
    }
    console.log(row)
  }
}

drawInverseTriangle(8)
