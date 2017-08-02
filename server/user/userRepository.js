const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')

const getUserInfo = email =>
  db.query('SELECT id, name ,lang FROM fra_user WHERE email = $1', [email])
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

module.exports.getUserInfoByEmail = getUserInfo

module.exports.findUserByLoginEmails = emails =>
  db.query('SELECT email from fra_user WHERE login_email in ($1)', [emails.join(',')])
    .then(res => res.rows.length > 0 ? getUserInfo(res.rows[0].email) : null)

module.exports.updateLanguage = (client, lang, userInfo) =>
  client
    .query('UPDATE fra_user SET lang = $1 WHERE id = $2', [lang, userInfo.id])
