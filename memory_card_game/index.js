const gridContainer = document.querySelector('.grid-container')

let cards = []
let firstCard, secondCard
let lockBoard = false
let score = 0
let timer
let seconds = 60
let matchedPairs = 0

document.querySelector('.score').textContent = score

fetch('./data/data.json')
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]
    shuffleCards()
    generateCards()
  })

function startTimer() {
  timer = setInterval(() => {
    seconds--
    document.querySelector('.timer').textContent = seconds

    if (seconds === 0) {
      stopTimer()
      endGame(false)
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
}

function shuffleCards() {
  let currentIndex = cards.length
  let randomIndex
  let tempValue
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    tempValue = cards[currentIndex]
    cards[currentIndex] = cards[randomIndex]
    cards[randomIndex] = tempValue
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.setAttribute('data-name', card.name)
    cardElement.innerHTML = `
    <div class="front"><img class="front-image" src=${card.image} alt=${card.name}></div>
    <div class="back">
      <img class="back-image" src="./assets/main.png" alt="back" />
    </div>
    `
    gridContainer.appendChild(cardElement)
    cardElement.addEventListener('click', flipCard)
  }
  startTimer()
}

function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
}

function disableCard() {
  setTimeout(() => {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    firstCard.remove()
    secondCard.remove()
    matchedPairs++

    if (matchedPairs === cards.length / 2) {
      stopTimer()
      endGame(true)
    }
    resetBoard()
  }, 1000)
}

function unFlipCard() {
  setTimeout(() => {
    firstCard.classList.remove('flipped')
    secondCard.classList.remove('flipped')
    resetBoard()
  }, 1500)
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return

  this.classList.add('flipped')
  if (!firstCard) {
    firstCard = this
    return
  }

  secondCard = this
  lockBoard = true

  let isMatch = firstCard.dataset.name === secondCard.dataset.name

  if (isMatch) {
    score += 10
    document.querySelector('.score').textContent = score
    disableCard()
  } else {
    score -= 5
    document.querySelector('.score').textContent = score
    unFlipCard()
  }
}

function endGame(success) {
  stopTimer()
  if (success) {
    alert('Congratulations! You completed the game successfully.')
  } else {
    alert('Game Over! You ran out of time.')
  }

  stopTimer()
}

function restart() {
  stopTimer()
  resetBoard()
  shuffleCards()
  score = 0
  document.querySelector('.score').textContent = score
  document.querySelector('.timer').textContent = 60
  seconds = 60
  gridContainer.innerHTML = ''
  generateCards()
}
