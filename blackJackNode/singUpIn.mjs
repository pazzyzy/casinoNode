import readFromTerminal from './readFromTerminal.mjs'
import { writeToDb } from '../postgresNode/index.mjs'

function singUpIn(infoAboutUsers) {
  const registrationOrLogin = readFromTerminal(
    'Write to login [ log ]     /     to create new account write [ new ] => '
  )

  switch (registrationOrLogin) {
    case 'log':
      return login(infoAboutUsers)
    case 'new':
      console.log('new acc')
      registration(infoAboutUsers)
      break
    default:
      console.log('error. write [ log ] or [ new ] ')
      singUpIn(infoAboutUsers)
      break
  }
  console.log('doshlo do konca')
}

function login(infoAboutUsers) {
  let userId
  const userLogin = readFromTerminal('Enter login => ')
  const userPassword = readFromTerminal('Enter password => ')
  infoAboutUsers.forEach((element) => {
    if (element.login === userLogin && element.password === userPassword) {
      console.log('element.id = userId = ', element.id)
      console.log('баланс = ', element.balance)
      userId = element.id
      return
    }
  })
  return userId
}

function registration(infoAboutUsers) {
  const userLogin = readFromTerminal('Enter new login => ')
  const userPassword = readFromTerminal('Enter new password => ')
  const userBalance = readFromTerminal('Enter your deposit => ')
  let userIsNew = true
  infoAboutUsers.forEach((element) => {
    if (element.login === userLogin) {
      console.log('A user with the same name already exists')
      userIsNew = false
      singUpIn(infoAboutUsers)
    }
  })
  if (userIsNew) {
    const userId = infoAboutUsers.lenght
    writeToDb() //(userId, userLogin, userPassword, userBalance)
  }
  // addInfoToDB(in)
}

// function registration(infoAboutUsers) {
//   const userLogin = readFromTerminal('Enter new login => ')
//   const userPassword = readFromTerminal('Enter new password => ')
//   const userBalance = readFromTerminal('Enter your deposit => ')
//   infoAboutUsers.forEach((element) => {
//     if (element.login === userLogin) {
//       console.log('A user with the same name already exists')
//       return
//     }
//     const userId = infoAboutUsers.lenght
//     addInfoToDB(userId, userLogin, userPassword, userBalance)
//     // addInfoToDB(in)
//   })
// }

export { singUpIn }
