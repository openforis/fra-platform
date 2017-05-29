const db = require('./db/db')
const camelize = require('camelize')

module.exports.getAllCountries = () => db.query(`SELECT * FROM country`).then(res => camelize(res))

