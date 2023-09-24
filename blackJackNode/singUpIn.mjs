import readFromTerminal from './readFromTerminal.mjs'

function singUpIn(infoAboutUsers) {
  const registrationOrLogin = readFromTerminal(
    'Write to login [ log ]     /     to create new account write [ new ] => '
  )
  let userId

  switch (registrationOrLogin) {
    case 'log':
      const userLogin = readFromTerminal('Enter new login => ')
      const userPassword = readFromTerminal('Enter new password => ')
      infoAboutUsers.forEach((element) => {
        if (element.login === userLogin && element.password === userPassword) {
          console.log('element.id = userId = ', element.id)
          console.log('баланс = ', element.balance)

          userId = element.id
          return
        }
      })
      console.log('ne doshlo do konca')
      return userId
    case 'new':
      console.log('new acc')
      break
    default:
      console.log('error. write [ log ] or [ new ] ')
      singUpIn(infoAboutUsers)
      break
  }
  console.log('doshlo do konca')
}

export { singUpIn }
