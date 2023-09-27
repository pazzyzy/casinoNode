import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import pg from 'pg'
import { info } from 'console'
const { Pool } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({
  override: true,
  path: path.join(__dirname, 'development.env'),
})

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

const id = 4
const login = 4
const password = 4
const balance = 4

const readFromDb = async () => {
  try {
    const { rows } = await pool.query('SELECT * from users')
    return rows
  } catch (err) {
    console.log(err)
  }
}

// function readFromDb() {
//   let infoAboutUsers
//   ;(async () => {
//     // const client = await pool.connect()
//     try {
//       const { rows } = await pool.query('SELECT * from users')

//       infoAboutUsers = rows

//       // console.log('rows.length = ', rows.length)
//       // console.log('rows = ', rows)
//     } catch (err) {
//       console.log(err)
//     } //finally {
//     //   client.release()
//     // }
//     console.log('infoAboutUsers = ', infoAboutUsers)
//     return infoAboutUsers
//   })()
// }

function writeToDb() {
  ;(async () => {
    try {
      const { rows } = await pool.query('SELECT * from users')

      await pool.query(
        `INSERT INTO users (id, login, password, balance) VALUES(4, 4, 4, 4)`
      )
    } catch (err) {
      console.log(err)
    }
  })()
}

export { readFromDb, writeToDb }
