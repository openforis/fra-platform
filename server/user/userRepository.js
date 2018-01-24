const uuidv4 = require('uuid/v4')
const camelize = require('camelize')

const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')
const { AccessControlException } = require('../utils/accessControl')

const findUserById = async (userId, client = db) => {
  const res = await client.query('SELECT id, name, email, lang FROM fra_user WHERE id = $1', [userId])
  if (res.rows.length < 1) return null
  const resultUser = res.rows[0]
  const resultRoles = await client.query('SELECT country_iso, role FROM user_country_role WHERE user_id = $1', [resultUser.id])
  return {...resultUser, roles: camelize(resultRoles.rows)}
}

const findUserByLoginEmail = (loginEmail, client = db) =>
  client.query('SELECT id from fra_user WHERE LOWER(login_email) in ($1)', [loginEmail])
    .then(res => res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null)

const updateLanguage = (client, lang, userInfo) =>
  client
    .query('UPDATE fra_user SET lang = $1 WHERE id = $2', [lang, userInfo.id])

const fetchCountryUsers = (countryIso) =>
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
  `, [countryIso])
    .then(res => camelize(res.rows))

const fetchInvitations = (countryIso) =>
  db.query(
    `SELECT
       invitation_uuid,
       email,
       name,
       role
     FROM fra_user_invitation
     WHERE country_iso = $1
     AND accepted IS NULL`,
    [countryIso])
    .then(res => camelize(res.rows))

const fetchUsersAndInvitations = async (countryIso) => {
  const users = await fetchCountryUsers(countryIso)
  const invitations = await fetchInvitations(countryIso)
  return [...users, ...invitations]
}

const insertUser = (client, email, name, loginEmail) =>
  client.query(`
    INSERT INTO
      fra_user(email, name, login_email)
    VALUES ($1, $2, $3)
  `, [email, name, loginEmail])

const getIdOfJustAddedUser = client =>
  client.query(`SELECT last_value as user_id FROM fra_user_id_seq`)

const addInvitation = async (client, user, countryIso, userToInvite) => {
  const invitationUuid = uuidv4()
  await client.query(
    `INSERT INTO
      fra_user_invitation
      (invitation_uuid, email, name, role, country_iso)
     VALUES
     ($1, $2, $3, $4, $5)`,
    [invitationUuid, userToInvite.email, userToInvite.name, userToInvite.role, countryIso]
  )
  await auditRepository
    .insertAudit(client, user.id, 'addInvitation', countryIso, 'users', {
      user: userToInvite.name,
      role: userToInvite.role
    })
  return invitationUuid
}

const removeInvitation = async (client, user, countryIso, invitationUuid) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (invitationInfo.countryIso !== countryIso) throw new AccessControlException('error.access.countryDoesNotMatch', {countryIso})
  await client.query(
    'DELETE FROM fra_user_invitation WHERE invitation_uuid = $1',
    [invitationUuid]
  )
  await auditRepository
    .insertAudit(client, user.id, 'removeInvitation', countryIso, 'users', {
      user: invitationInfo.name,
      role: invitationInfo.role
    })
}

const updateInvitation = async (client, user, countryIso, userToUpdate) => {
  await client.query(
    `UPDATE fra_user_invitation
      SET email = $2, name = $3, role = $4, country_iso = $5
      WHERE invitation_uuid = $1`,
    [userToUpdate.invitationUuid, userToUpdate.email, userToUpdate.name, userToUpdate.role, countryIso]
  )
  await auditRepository
    .insertAudit(client, user.id, 'updateInvitation', countryIso, 'users', {
      user: userToUpdate.name,
      role: userToUpdate.role
    })
  return userToUpdate.invitationUuid
}

const updateUserFields = (client, userToUpdate) =>
  client.query(
    `
      UPDATE
        fra_user
      SET
        name = $1,
        email = $2
      WHERE
        id = $3
    `,
  [userToUpdate.name, userToUpdate.email, userToUpdate.id]
)

const updateUser = async (client, user, countryIso, userToUpdate) => {
  await updateUserFields(client, userToUpdate)
  await client.query(
      `
      UPDATE
        user_country_role
      SET
        role = $1
      WHERE
        user_id = $2
      AND
        country_iso = $3
      `,
    [userToUpdate.role, userToUpdate.id, countryIso]
  )
  await auditRepository.insertAudit(client, user.id, 'updateUser', countryIso, 'users', {user: userToUpdate.name})
}

const removeCountryUser = async (client, user, countryIso, userId) => {
  const userToRemove = await findUserById(userId, client)
  await client.query(`
        DELETE FROM
          user_country_role
        WHERE
          user_id = $1
        AND
          country_iso = $2
  `, [userId, countryIso])
  const roleCountInOtherCountriesResult = await client.query(
    'SELECT COUNT(*) AS role_count FROM user_country_role WHERE user_id = $1',
    [userId]
  )
  const roleCountInOtherCountries = roleCountInOtherCountriesResult.rows[0].role_count
  if (Number(roleCountInOtherCountries) === 0) {
    await client.query(`DELETE FROM fra_user WHERE id = $1`, [userId])
  }
  await auditRepository.insertAudit(client, user.id, 'removeUser', countryIso, 'users', {user: userToRemove.name})
}

const getInvitationInfo = async (client, invitationUuid) => {
  console.log(invitationUuid)
  const invitationInfo = await client.query(
    `SELECT country_iso, name, role, accepted, email
      FROM fra_user_invitation
      WHERE invitation_uuid = $1`,
    [invitationUuid]
  )
  if (invitationInfo.rows.length !== 1) throw new Error('Invalid invitation uuid', invitationUuid)
  return camelize(invitationInfo.rows[0])
}

const setInvitationAccepted = (client, invitationUuid) => client.query(
  `UPDATE fra_user_invitation
      SET accepted = now()
     WHERE invitation_uuid = $1`,
  [invitationUuid]
)

const addUserCountryRole = (client, userId, countryIso, role) =>
  client.query(
  `INSERT INTO user_country_role
      (user_id, country_iso, role)
      VALUES
      ($1, $2, $3)`,
  [userId, countryIso, role]
)

const addNewUserBasedOnInvitation = async (client, invitationUuid, loginEmail) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (!!invitationInfo.accepted) throw new AccessControlException('error.access.invitationAlreadyUsed', {loginEmail, invitationUuid})
  await insertUser(client, invitationInfo.email, invitationInfo.name, loginEmail)
  const userIdResult = await getIdOfJustAddedUser(client)
  const userId = userIdResult.rows[0].user_id
  await addUserCountryRole(client, userId, invitationInfo.countryIso, invitationInfo.role)
  await setInvitationAccepted(client, invitationUuid)
  await addAcceptToAudit(client, userId, invitationInfo)
}

const addAcceptToAudit = (client, userId, invitationInfo) =>
  auditRepository.insertAudit(
    client,
    userId,
    'acceptInvitation',
    invitationInfo.countryIso,
    'users',
    {
      user: invitationInfo.name,
      role: invitationInfo.role
    })

const addCountryRoleAndUpdateUserBasedOnInvitation = async (client, user, invitationUuid) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (!!invitationInfo.accepted) return //Invitation is already accepted, just allow the user to log in normally
  await updateUserFields(client, {...invitationInfo, id: user.id})
  await addUserCountryRole(client, user.id, invitationInfo.countryIso, invitationInfo.role)
  await setInvitationAccepted(client, invitationUuid)
  await addAcceptToAudit(client, user.id, invitationInfo)
}

const acceptInvitation = async (client, invitationUuid, loginEmail) => {
  const user = await findUserByLoginEmail(loginEmail, client)
  if (user) {
    await addCountryRoleAndUpdateUserBasedOnInvitation(client, user, invitationUuid)
    return user
  } else {
    await addNewUserBasedOnInvitation(client, invitationUuid, loginEmail)
    const user = await findUserByLoginEmail(loginEmail, client)
    return user
  }
}

module.exports = {
  findUserById,
  findUserByLoginEmail,
  updateLanguage,
  fetchCountryUsers,
  addInvitation,
  updateInvitation,
  removeInvitation,
  updateUser,
  removeCountryUser,
  acceptInvitation,
  addCountryRoleAndUpdateUserBasedOnInvitation,
  fetchUsersAndInvitations
}
