import cardStrength from '../blackJackNode/cardStrength.mjs'

if (cardStrength({ suit: '♥️', value: 3 }) != '3') {
  throw new Error('Функия cardStrength работает неверно!')
}

if (cardStrength({ suit: '♥️', value: 'a' }) != 'a') {
  throw new Error('Функия cardStrength работает неверно!')
}
