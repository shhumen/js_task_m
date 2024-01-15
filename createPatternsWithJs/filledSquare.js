function drawFilledSquare(size) {
  let row = ''
  for (let i = 0; i < size; i++) {
    row = ' '
    for (let j = 0; j < size; j++) {
      row += ' * '
    }
    console.log(row)
  }
}

drawFilledSquare(10)
