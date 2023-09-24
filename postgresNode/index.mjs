import { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } from './InfoBd.mjs'

import pkg from 'pg'
const { Client } = pkg

const connectAndReadFromDb = async () => {
  try {
    const client = new Client({
      user: PGUSER,
      host: PGHOST,
      database: PGDATABASE,
      password: PGPASSWORD,
      port: PGPORT,
    })
    await client.connect()
    const res = await client.query(`SELECT * FROM users`)
    // console.log(res.rows[0].email)
    // console.log(res.rows)
    await client.end()
    return res.rows //возвращаем массив объектов {id, login, password, balance}
  } catch (error) {
    console.log(error)
  }
}

export default connectAndReadFromDb

// const addInfo = async () => {
//   try {
//     const client = new Client({
//       user: PGUSER,
//       host: PGHOST,
//       database: PGDATABASE,
//       password: PGPASSWORD,
//       port: PGPORT,
//     })
//     await client.connect()
//     const res = await client.query(
//       `INSERT INTO users (id, login, password) VALUES (2, 3, 4)`
//     )
//     await client.end()
//   } catch (error) {
//     console.log(error)
//   }
// }
