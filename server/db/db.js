// Mostly copied from an example here: https://github.com/brianc/node-postgres

const pg = require('pg')
const promise = require('bluebird')

const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = promise.promisifyAll(new pg.Pool(config))

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})

// the query function for passing queries to the pool
module.exports.query = (text, values) => pool.query(text, values)

const connect = function () {
  return pool.connect()
}

// For multiple operations, such as a transactions
module.exports.connect = connect

/*
 * Pass in a function-reference and it's arguments after client like this:
 * db.transaction(someRepository.saveStuff, [name, contents])
 *
 * The function signature would look like this:
 * saveStuff(client, name, contents)
 *
 * You must always use the client to queries
 */
module.exports.transaction = (fn, argv) => {
  return connect()
    .then(client =>
      client.query('BEGIN')
        .then(() => fn.apply(null, [client, ...argv])
          .then(response => Promise.all([response, client.query('COMMIT')]))
          .then(([response, _]) => {
            client.release()
            return response
          })
          .catch(err => Promise.all([{__error: err}, client.query('ROLLBACK')]))
          .then(result => {
            // Test if we have arrived via catch
            if (isCatchResult(result)) {
              throw result[0].__error
            } else {
              return result
            }
          }))
    )
}

const isCatchResult = (result) =>
result &&
result.hasOwnProperty('length') &&
typeof result.length === 'number' &&
result.length === 2 &&
result[0] &&
result[0].__error
