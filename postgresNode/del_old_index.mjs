// import {
//   PGUSER,
//   PGHOST,
//   PGPASSWORD,
//   PGDATABASE,
//   PGPORT,
// } from './del_InfoBd.mjs'

// import pkg from 'pg'
// // const { Client } = pkg
// const { Pool } = pkg

// const pool = new Pool({
//   user: PGUSER,
//   host: PGHOST,
//   database: PGDATABASE,
//   password: PGPASSWORD,
//   port: PGPORT,
// })

// const newClient = new Client({
//   user: PGUSER,
//   host: PGHOST,
//   database: PGDATABASE,
//   password: PGPASSWORD,
//   port: PGPORT,
// })

// const pool = new pkg.Pool({
//   user: PGUSER,
//   host: PGHOST,
//   database: PGDATABASE,
//   password: PGPASSWORD,
//   port: PGPORT,
// })

// const connectAndReadFromDb = async () => {
//   try {
//     pool.connect(function (err, client, done) {
//       if (err) {
//         return console.error('connexion error', err)
//       }
//       client.query('select * from users', function (err, result) {
//         // call `done()` to release the client back to the pool
//         done()

//         if (err) {
//           return console.error('error running query', err)
//         }
//         console.log(result.rows)
//         return result.rows
//       })
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// const connectAndReadFromDb = async () => {
//   try {
//     const client = newClient
//     await client.connect()
//     const res = await client.query(`SELECT * FROM users`)
//     // console.log(res.rows[0].email)
//     await client.end()
//     return res.rows //возвращаем массив объектов {id, login, password, balance}
//   } catch (error) {
//     console.log(error)
//   }
// }

// const addInfoToDB = async (id, login, password, balance) => {
//   console.log('probyu zapisat`')
//   try {
//     const client = newClient
//     await client.connect()
//     const res = await client.query(
//       `INSERT INTO users (id, login, password, balance) VALUES
//        (${id}}, ${login}, ${password}, ${balance})`
//     )
//     await client.end()
//   } catch (error) {
//     console.log(error)
//   }
// }

// export { connectAndReadFromDb, addInfoToDB }
