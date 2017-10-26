const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')
const auditRepository = require('./../audit/auditRepository')
const {isSuperUser} = require('../../common/countryRole')

const findUserById = (userId, client = db) =>
  client.query('SELECT id, name ,lang FROM fra_user WHERE id = $1', [userId])
    .then(res => {
        if (res.rows.length > 0) {
          const resultUser = res.rows[0]
          return Promise.all([
            resultUser,
            client.query('SELECT country_iso, role FROM user_country_role WHERE user_id = $1', [resultUser.id])
          ])
        } else {
          return null
        }
      }
    ).then(res => res ? R.assoc('roles', camelize(res[1].rows), res[0]) : null)

const findUserByLoginEmails = (emails, client = db) =>
  client.query('SELECT id from fra_user WHERE LOWER(login_email) in ($1)', [emails.join(',')])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null)

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

const addUser = (client, user, countryIso, userToAdd, invitationUUID) =>
  client.query(`
    INSERT INTO
      fra_user(email, name, invitation_uuid)
    VALUES ($1, $2, $3)
  `, [userToAdd.email, userToAdd.name, invitationUUID])
    .then(() =>
      client.query(`
        INSERT INTO
          user_country_role(user_id, country_iso, role)
        VALUES 
          ((SELECT last_value FROM fra_user_id_seq), $1, $2)
      `, [countryIso, userToAdd.role])
    )
    .then(() => client.query('SELECT last_value as user_id FROM fra_user_id_seq'))
    .then(res =>
      auditRepository
        .insertAudit(client, user.id, 'add', countryIso, 'users', {userId: res.rows[0].user_id, role: userToAdd.role})
    )

const updateUser = (client, user, countryIso, userToUpdate) =>
  client.query(`
    UPDATE 
      fra_user
    SET 
      name = $1,
      email = $2
    WHERE 
      id = $3  
  `, [userToUpdate.name, userToUpdate.email, userToUpdate.id])
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
      `, [userToUpdate.role, userToUpdate.id, countryIso])
    )
    .then(() =>
      auditRepository.insertAudit(client, user.id, 'update', countryIso, 'users', {userId: userToUpdate.id})
    )

const removeCountryUser = (client, user, countryIso, userId) =>
  client.query(`
    DELETE FROM
      user_country_role
    WHERE 
      user_id = $1
    AND
      country_iso = $2
  `, [userId, countryIso])
    .then(() =>
      auditRepository.insertAudit(client, user.id, 'remove', countryIso, 'users', {userId})
    )

const authorizeUser = (client, invitationUUID, loginEmail) =>
  client.query(`
      UPDATE fra_user
      SET login_email = $1, invitation_uuid = null
      WHERE invitation_uuid = $2
      `, [loginEmail.toLowerCase(), invitationUUID])
    .then(() => findUserByLoginEmails([loginEmail], client))
    .then(user =>
      auditRepository.insertAudit(client, user.id, 'acceptInvitation', user.roles[0].countryIso, 'users', {
        userId: user.id,
        role: user.roles[0].role
      }).then(() => user)
    )

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
