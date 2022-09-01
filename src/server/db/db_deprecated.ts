// Mostly copied from an example here: https://github.com/brianc/node-postgres
import * as pg from 'pg'

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: +process.env.PGPORT,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    }

export const pool = new pg.Pool(config)

pool.on('error', function (err: any) {
  console.error('idle client error', err.message, err.stack)
})

// For multiple operations, such as a transactions

/*
 * Pass in a function-reference and it's arguments after client like this:
 * db.transaction(someRepository.saveStuff, [name, contents])
 *
 * The function signature would look like this:
 * saveStuff(client, name, contents)
 *
 * You must always use the client to queries
 *
 * Code taken from https://node-postgres.com/features/transactions
 */
export const transaction = async (fn: any, argv: any) => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const result = await fn.apply(null, [client, ...argv])

    await client.query('COMMIT')
    return result
  } catch (e) {
    await client.query('ROLLBACK')
    // console.log("==== ROLLBACK ")
    throw e
  } finally {
    // console.log("==== client.release()")
    client.release()
  }
}
