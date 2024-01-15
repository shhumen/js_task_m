function createCharacterPyramid(character, height) {
  for (let i = 0; i < height; i++) {
    let row = ''
    // Spaces // 5-1-1 = 3 spaces ;  5-2-1 = 2 spaces
    row += ' '.repeat(height - i - 1)

    for (let j = 0; j <= i * 2; j++) {
      // ascending and descending : if j>i => descending BA ;  if j<=i ascending AB
      row += String.fromCharCode(65 + (j <= i ? j : i * 2 - j))
    }

    console.log(row)
  }
}

createCharacterPyramid('A', 5)
