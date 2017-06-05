const db = require('../db/db')

module.exports.getUserInfo = (email) =>
  db.query('SELECT id, name FROM fra_user WHERE email = $1', [email])
    .then(res => res.rows.length > 0 ?  res.rows[0] : null)
