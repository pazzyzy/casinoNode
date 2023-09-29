import readFromTerminal from './readFromTerminal.mjs'
import { writeToDb } from '../postgresNode/index.mjs'

async function singUpIn(infoAboutUsers) {
  const registrationOrLogin = readFromTerminal(
    'Write to login [ log ]     /     to create new account write [ new ] => '
  )
  switch (registrationOrLogin) {
    case 'log':
      return login(infoAboutUsers)
    case 'new':
      return registration(infoAboutUsers)
    default:
      console.log('error. write [ log ] or [ new ] ')
      singUpIn(infoAboutUsers)
      break
  }
}

function login(infoAboutUsers) {
  let user
  const login = readFromTerminal('Enter login => ')
  const password = readFromTerminal('Enter password => ')
  infoAboutUsers.forEach((element) => {
    if (element.login === login && element.password === password) {
      user = element
      return
    }
  })
  return user
}

function registration(infoAboutUsers) {
  const login = readFromTerminal('Enter new login => ')
  const password = readFromTerminal('Enter new password => ')
  const balance = readFromTerminal('Enter your deposit => ')
  infoAboutUsers.forEach((element) => {
    if (element.login === login) {
      console.log(
        'A user with the same name already exists. Try with a new new login\n'
      )
      registration(infoAboutUsers)
    }
  })
  const id = infoAboutUsers.length + 1
  writeToDb(id, login, password, balance)
  return { id, login, password, balance }
}

export { singUpIn }
