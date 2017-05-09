// Mostly copied from an example here: https://github.com/brianc/node-postgres

const pg = require('pg')

const config = {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(config)

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
})

// the query function for passing queries to the pool
module.exports.query = (text, values, callback) => {
    return pool.query(text, values, callback)
}

// For multiple operations, such as a transactions
module.exports.connect = function (callback) {
    return pool.connect(callback);
}
