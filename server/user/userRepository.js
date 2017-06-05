const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')

module.exports.getUserInfo = (email) =>
  db.query('SELECT id, name FROM fra_user WHERE email = $1', [email])
    .then(res => {
      if (res.rows.length > 0) {
        const resultUser = res.rows[0]
        return Promise.all([
          resultUser,
          db.query('SELECT country_iso, role FROM user_country_role WHERE user_id = $1', [resultUser.id])
        ])
      } else {
        return null
      }
    }
    ).then(res => res ? R.assoc('roles', camelize(res[1].rows), res[0]) : null)
