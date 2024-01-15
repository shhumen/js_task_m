function fibonacci(n) {
  const fibonacci_sequence = [0, 1]

  for (let i = 2; i < n; i++) {
    const next_fibonacci = fibonacci_sequence[i - 1] + fibonacci_sequence[i - 2]
    fibonacci_sequence.push(next_fibonacci)
  }

  return fibonacci_sequence.join(', ')
}

console.log(fibonacci(10))
