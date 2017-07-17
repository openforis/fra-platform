const db = require('../db/db')
const camelize = require('camelize')

module.exports.getAllCountries = () => db.query(`SELECT * FROM country ORDER BY name ASC`).then(res => camelize(res))

