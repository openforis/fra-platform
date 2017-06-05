const db = require('../db/db')

module.exports.getUserInfo = (email) => {
  return db.query('SELECT id, name FROM fra_user WHERE email = $1', [email])
    .then(res => {
      if (res.rows.length > 0)
        return res.rows[0]
      else
        return null
    })
}
