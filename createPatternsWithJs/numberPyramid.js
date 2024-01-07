function numberPyramid(height) {
  for (let i = 1; i <= height; i++) {
    // spaces
    let row = ' '.repeat(height - i)

    // ascending
    for (let j = 1; j <= i; j++) {
      row += j
    }
    // descending
    for (let m = i - 1; m >= 1; m--) {
      row += m
    }

    console.log(row)
  }
}

numberPyramid(5)
