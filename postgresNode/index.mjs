import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import pg from 'pg'
const { Pool } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tableName = process.env.tableName

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

const readFromDb = async () => {
  try {
    const { rows } = await pool.query('SELECT * from users')
    return rows
  } catch (err) {
    console.log(err)
  }
}

const writeToDb = async (id, login, password, balance) => {
  try {
    await pool.query(
      `INSERT INTO users (id, login, password, balance) VALUES(${id}, ${login}, ${password}, ${balance})`
    )
  } catch (err) {
    console.log(err)
  }
}

const updateUserBalance = async (balance, login) => {
  try {
    await pool.query(
      `UPDATE users SET balance = ${balance} WHERE login = '${login}'`
    )
  } catch (err) {
    console.log(err)
  }
}

export { readFromDb, writeToDb, updateUserBalance }
