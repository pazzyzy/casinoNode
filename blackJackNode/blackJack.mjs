import readFromTerminal from './readFromTerminal.mjs'
import shuffle from './deckForPlaying.mjs'
import deck from './deck.mjs'
import cardStrength from './cardStrength.mjs'

//setings
let playerBalance = 1000 // счет игрока
let blackJacksPoint = 21 // игра до

const numberOfDecks = 6 //количество колод в игре
const dealerPlayToThisPoint = blackJacksPoint - 4
let shuffleDeck = [...deck]
let numerOfMove = 0
let playerPoints = 0
let dealerPoints = 0
let bidSize = 0
let playerAces = 0
let dealerAces = 0
let dealerCardArr = []
let playerCardArr = []
let state = 'placingBet'
let needACard = 'y'

shuffleDeck = shuffle(shuffleDeck, numberOfDecks, deck)
separation()
console.log('\nwelcome to the blackjack game\n         start game')

//start game
while (playerBalance > 0) {
  mainLoop(state)
}
separation()
console.log('your balance is EMPTY')
separation()

//function
function mainLoop(state) {
  switch (state) {
    case 'placingBet':
      placingBet()
    case 'dealingStartingCard':
      dealingStartingCard()
      if (checkState()) {
        break
      }
    case 'playerTurn':
      playerTurn()
      if (checkState()) {
        break
      }
    case 'dealerTurn':
      dealerTurn()
    case 'checkScore':
      checkScore()
  }
  finishAndExit()
}

function placingBet() {
  console.log('\n*\n')
  console.log('playerBalance = ', playerBalance)
  separation()
  bidSize = Number(readFromTerminal('place your bet => '))
  if (bidSize > 0 && bidSize <= playerBalance) {
    playerBalance -= bidSize
  } else {
    console.log(`[ error, bid from 0 to ${playerBalance} ]`)
    placingBet()
  }
}

function dealingStartingCard() {
  getCartToDealer(shuffleDeck)
  getCardToPlayer(shuffleDeck)
  getCardToPlayer(shuffleDeck)
  separation()
  printCardAndScore()

  //Проверка не словил ли игрок БД с раздачи
  if (
    (dealerPoints != 10 || dealerPoints != 11) &&
    (playerPoints === blackJacksPoint || playerPoints === blackJacksPoint + 1)
  ) {
    console.log('player win')
    playerBalance += 2.5 * bidSize
    state = 'stopGame'
  }
}

function playerTurn() {
  separation()
  needACard = 'y'
  while (needACard === 'y') {
    needACard = readFromTerminal(
      'write [ y ] if you want one more card or [ n ] if you want stand => '
    )
    if (needACard === 'y') {
      getCardToPlayer(shuffleDeck)
      separation()
      printCardAndScore()
      separation()
    }
    checkPlayerScore()
  }
}

function dealerTurn() {
  separation()
  while (dealerPoints < dealerPlayToThisPoint) {
    getCartToDealer(shuffleDeck)
    separation()
    printCardAndScore()
    separation()
  }
  if (dealerPoints > blackJacksPoint && dealerAces > 0) {
    //При наличии тузов и переборе меняем их значение с 11 на 1
    dealerPoints -= 10
    dealerAces -= 1
    console.log('\nchange A = 11 to A = 1\n')
    printCardAndScore()
    dealerTurn()
  }
}

function checkScore() {
  if (dealerPoints > blackJacksPoint) {
    console.log('you win')
    separation()
    playerBalance += bidSize * 2
    return
  }
  if (dealerPoints === playerPoints) {
    console.log('push\nyou have an equal number of points')
    separation()
    playerBalance = playerBalance + bidSize
    return
  }
  if (dealerPoints < playerPoints) {
    console.log('you win')
    separation()
    playerBalance += bidSize * 2
    return
  }
  if (dealerPoints > playerPoints) {
    console.log('you lose')
    separation()

    return
  }
}

function finishAndExit() {
  const wantToPlay = readFromTerminal(
    'write [ y ] if you want to play more or [ n ] if you want to stop => '
  )
  switch (wantToPlay) {
    case 'y':
      break
    case 'n':
      separation()
      console.log(
        `Congratulations, you took from the balance = ${playerBalance}`
      )
      playerBalance = 0
      break
    default:
      console.log('Error')
      finishAndExit()
  }
  returnToDefault()
}

function separation() {
  console.log('_\n')
}

function getOneCard(deck) {
  let cardToGame = deck.shift()
  numerOfMove += 1
  return cardToGame
}

function getCartToDealer(deck) {
  const result = getOneCard(deck)
  if (result.value === 'A') {
    dealerAces++
  }
  dealerCardArr.push(result)
  dealerPoints += cardStrength(result)
}

function getCardToPlayer(deck) {
  const result = getOneCard(deck)
  if (result.value === 'A') {
    playerAces++
  }
  playerCardArr.push(result)
  playerPoints += cardStrength(result)
}

function printCardAndScore() {
  console.log('dealer card: ', dealerCardArr)
  console.log('dealer score: ', dealerPoints, '\n')
  console.log('player card: ', playerCardArr)
  console.log('player score: ', playerPoints)
}

function returnToDefault() {
  numerOfMove = 0
  playerPoints = 0
  dealerPoints = 0
  bidSize = 0
  playerAces = 0
  dealerAces = 0
  dealerCardArr = []
  playerCardArr = []
  state = 'placingBet'
  needACard = 'y'
}

function checkPlayerScore() {
  if (playerPoints > blackJacksPoint) {
    //При наличии туза изменяем его значение с 11 на 1
    if (playerAces > 0) {
      playerPoints -= 10
      playerAces--
      printCardAndScore()
      checkPlayerScore()
      return
    }
    console.log('you lose')
    separation()
    state = 'stopGame'
    needACard = 'n'
  }
  if (playerPoints === blackJacksPoint) {
    console.log('you win')
    separation()
    state = 'stopGame'
    needACard = 'n'
    playerBalance += bidSize * 2.5
  }
}

function checkState() {
  return state === 'stopGame'
}
