const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')
const {isSuperUser} = require('../../common/countryRole')

const findUserById = userId =>
  db.query('SELECT id, name ,lang FROM fra_user WHERE id = $1', [userId])
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

const findUserByLoginEmails = emails =>
  db.query('SELECT id from fra_user WHERE LOWER(login_email) in ($1)', [emails.join(',')])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id) : null)

const findUserByEmail = email =>
  db.query('SELECT id from fra_user WHERE LOWER(email) = $1', [email.toLowerCase()])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id) : null)

const updateLanguage = (client, lang, userInfo) =>
  client
    .query('UPDATE fra_user SET lang = $1 WHERE id = $2', [lang, userInfo.id])

const fetchCountryUsers = (countryIso, user) =>
  db.query(`
    SELECT
      u.id,            
      u.email,
      u.name,
      u.login_email,
      u.lang,
      cr.role
    FROM
      fra_user u
    JOIN 
      user_country_role cr
      ON 
        u.id = cr.user_id
      AND 
        cr.country_iso = $1
  ${isSuperUser(user)
    ? `
    UNION    
    SELECT
      u.id,            
      u.email,
      u.name,
      u.login_email,
      u.lang,
      cr.role
    FROM
      fra_user u
    JOIN 
      user_country_role cr
      ON 
        u.id = cr.user_id
      AND 
        cr.role in ('REVIEWER_ALL', 'NATIONAL_CORRESPONDENT_ALL')
    `
    : ''
    }
  ORDER BY id
  `, [countryIso])
    .then(res => camelize(res.rows))

const addUser = (client, countryIso, user, invitationUUID) => {
  return client.query(`
    INSERT INTO
      fra_user(email, name, invitation_uuid)
    VALUES ($1, $2, $3)
  `, [user.email, user.name, invitationUUID])
    .then(() =>
      client.query(`
        INSERT INTO
          user_country_role(user_id, country_iso, role)
        VALUES 
          ((SELECT last_value FROM fra_user_id_seq), $1, $2)
      `, [countryIso, user.role])
    )
}

const updateUser = (client, countryIso, user) =>
  client.query(`
    UPDATE 
      fra_user
    SET 
      name = $1,
      email = $2
    WHERE 
      id = $3  
  `, [user.name, user.email, user.id])
    .then(() =>
      client.query(`
        UPDATE 
          user_country_role
        SET 
          role = $1
        WHERE 
          user_id = $2
        AND 
          country_iso = $3    
      `, [user.role, user.id, countryIso])
    )

const removeCountryUser = (client, countryIso, userId) =>
  client.query(`
    DELETE FROM
      user_country_role
    WHERE 
      user_id = $1
    AND
      country_iso = $2
  `, [userId, countryIso])

const authorizeUser = (invitationUUID, loginEmail) =>
  db.query(`
    UPDATE fra_user
    SET login_email = $1, invitation_uuid = null
    WHERE invitation_uuid = $2
  `, [loginEmail, invitationUUID])

module.exports = {
  findUserById,
  findUserByLoginEmails,
  findUserByEmail,
  updateLanguage,
  fetchCountryUsers,
  addUser,
  updateUser,
  removeCountryUser,
  authorizeUser
}
