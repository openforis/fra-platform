const db = require("./db/db")


module.exports.getAllCountries = () => db.query(`SELECT * FROM country`)

