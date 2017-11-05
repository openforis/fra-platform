const Promise = require('bluebird')
const uuidv4 = require('uuid/v4')
const R = require('ramda')
const camelize = require('camelize')

const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')
const {hasNoRole} = require('../../common/countryRole')

const findUserById = (userId, client = db) =>
  client.query('SELECT id, name, email, lang FROM fra_user WHERE id = $1', [userId])
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

const findUserByLoginEmail = (loginEmail, client = db) =>
  client.query('SELECT id from fra_user WHERE LOWER(login_email) in ($1)', [loginEmail])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null)

const findUserByEmail = (email, client = db) =>
  client.query('SELECT id from fra_user WHERE LOWER(email) = $1', [email.toLowerCase()])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null)

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
    ORDER BY id
  `, [countryIso])
    .then(res => camelize(res.rows))

const insertUser = (client, email, name, invitationUUID) =>
  client.query(`
    INSERT INTO
      fra_user(email, name, invitation_uuid)
    VALUES ($1, $2, $3)
  `, [email, name, invitationUUID])

const authorizeUser = (client, userAction, countryIso, userId, role, userName) =>
  client.query(`
        INSERT INTO
          user_country_role(user_id, country_iso, role)
        VALUES
          ($1, $2, $3)
      `, [userId, countryIso, role])
    .then(() =>
      auditRepository
        .insertAudit(client, userAction.id, 'addUser', countryIso, 'users', {
          user: userName,
          role: role.toLowerCase()
        })
    )

const addCountryUser = (client, user, countryIso, userToAdd) =>
  findUserByEmail(userToAdd.email, client)
    .then(userDb => {

      if (userDb) {
        if (hasNoRole(countryIso, userDb))
        // existing user has not been authorized to country
          return authorizeUser(client, user, countryIso, userDb.id, userToAdd.role, userDb.name)
            .then(() => findUserById(userDb.id, client))
        else
        // existing user has already been authorized to country
          return Promise.resolve()
      } else {
        // creating new user
        const invitationUUID = uuidv4()
        return insertUser(client, userToAdd.email, userToAdd.name, invitationUUID)
          .then(() => client.query(`SELECT last_value as user_id FROM fra_user_id_seq`))
          .then(res => Promise.all([res.rows[0].user_id, authorizeUser(client, user, countryIso, res.rows[0].user_id, userToAdd.role, userToAdd.name)]))
          .then(([userId, _]) => findUserById(userId, client))
          .then(user => R.assoc('invitationUUID', invitationUUID, user))
      }

    })

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
      auditRepository.insertAudit(client, user.id, 'updateUser', countryIso, 'users', {user: userToUpdate.name})
    )

const removeCountryUser = (client, user, countryIso, userId) =>
  findUserById(userId, client)
    .then(userToRemove =>
      auditRepository.insertAudit(client, user.id, 'removeUser', countryIso, 'users', {user: userToRemove.name})
    )
    .then(() =>
      client.query(`
        DELETE FROM
          user_country_role
        WHERE
          user_id = $1
        AND
          country_iso = $2
  `, [userId, countryIso])
    )

const updateInvitedNewUser = (client, invitationUUID, loginEmail) =>
  client.query(`
      UPDATE fra_user
      SET login_email = $1, invitation_uuid = null
      WHERE invitation_uuid = $2
      `,
    [loginEmail.toLowerCase(), invitationUUID]
  )

const addUserRole = async (client, user, invitationUUID) => {
  const invitationInfo = await client.query(
    'SELECT country_iso, role, accepted FROM fra_user_invitation WHERE invitation_uuid = $1',
    [invitationUUID]
  )
  console.log('invitation rows lengt:')
  console.log(invitationInfo.rows.length)
  if (invitationInfo.rows.length !== 1) throw new Error('Invalid invitation uuid', invitationUUID)
  const accepted = !!invitationInfo.rows[0].accepted
  console.log('already accepted?', accepted)
  if (accepted) return //Invitation is already accepted

  const countryIso = invitationInfo.rows[0].country_iso
  const role = invitationInfo.rows[0].role


  await client.query(
    `INSERT INTO user_country_role 
      (user_id, country_iso, role) 
      VALUES 
      ($1, $2, $3)`,
    [user.id, countryIso, role]
  )

  console.log('added countryIso and role from invitation ', invitationUUID)
  console.log(countryIso)
  console.log(role)
  console.log('for user ', user)

  //TODO add accepted timestamp
}

const acceptInvitation = async (client, invitationUUID, loginEmail) => {
  const user = await findUserByLoginEmail(loginEmail, client)
  console.log('accept invitation user', user, loginEmail)
  if (user) {
    console.log('found existing user for email', loginEmail)
    await addUserRole(client, user, invitationUUID)
    console.log('added user role for ', loginEmail)
    return user
  } else {
    await updateInvitedNewUser(client, invitationUUID, loginEmail)
    const user = await findUserByEmail(loginEmail, client)
    await auditRepository.insertAudit(client, user.id, 'acceptInvitation', user.roles[0].countryIso, 'users', {
      user: user.name,
      role: user.roles[0].role.toLowerCase()
    })
    return user
  }
}

module.exports = {
  findUserById,
  findUserByLoginEmail,
  updateLanguage,
  fetchCountryUsers,
  addCountryUser,
  updateUser,
  removeCountryUser,
  acceptInvitation
}
