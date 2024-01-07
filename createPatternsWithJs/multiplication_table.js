const tableSize = 10

const multiplication_table = () => {
  for (i = 2; i <= tableSize; i++) {
    for (j = 2; j <= tableSize; j++) {
      if (j === 10) {
        console.log('============\n')
      }
      console.log(`${i} * ${j} = ${i * j}`)
    }
  }
}

console.log(multiplication_table())
