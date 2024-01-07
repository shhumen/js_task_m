const tableSize = 10

const multiplication_table = () => {
  for (i = 1; i <= tableSize; i++) {
    for (j = 1; j <= tableSize; j++) {
      console.log(`${i} * ${j} = ${i * j}`)
    }
    console.log('============\n')
  }
}

console.log(multiplication_table())
