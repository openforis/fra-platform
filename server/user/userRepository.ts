const { v4: uuidv4 } = require('uuid')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'bcrypt'.
const bcrypt = require('bcrypt')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FRA'.
const FRA = require('../../common/assessment/fra')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountryRep... Remove this comment to see the full error message
const CountryRepository = require('../country/countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchColla... Remove this comment to see the full error message
const { fetchCollaboratorCountryAccessTables } = require('../collaborators/collaboratorsRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AccessCont... Remove this comment to see the full error message
const { AccessControlException } = require('../utils/accessControl')

const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nationalCo... Remove this comment to see the full error message
  nationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewer'.
  reviewer,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'collaborat... Remove this comment to see the full error message
  collaborator,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'alternateN... Remove this comment to see the full error message
  alternateNationalCorrespondent,
} = require('../../common/countryRole')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userType'.
const { userType } = require('../../common/userUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'loginUrl'.
const { loginUrl } = require('./sendInvitation')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findUserBy... Remove this comment to see the full error message
const findUserById = async (userId: any, client = db) => {
  const res = await client.query(
    'SELECT id, name, email, login_email, institution, position, lang, type, active FROM fra_user WHERE id = $1',
    [userId]
  )
  if (res.rows.length < 1) return null
  const resultUser = camelize(res.rows[0])
  const res2 = await client.query('SELECT country_iso, role, assessment FROM user_country_role WHERE user_id = $1', [
    resultUser.id,
  ])
  const roles = await camelize(res2.rows)
  // TODO: For each assessment type, handle roles.
  // We currently have only fra2020
  const role = {
    [FRA.type]: await CountryRepository.getAllowedCountries(roles),
  }
  // TODO: Refactor backend to use role
  // roles is left here because it is used widely
  return { ...resultUser, role, roles }
}

const findUserByLoginEmail = (loginEmail: any, client = db) =>
  client
    .query(
      `SELECT id 
    FROM fra_user 
    WHERE LOWER(login_email) in ($1) 
    AND active = $2`,
      [loginEmail, true]
    )
    .then((res: any) => (res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null))

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findLocalU... Remove this comment to see the full error message
const findLocalUserByEmail = async (email: any, client = db) => {
  const res = await client.query(
    `
    SELECT id
    FROM fra_user 
    WHERE LOWER(email) = LOWER($1)
    AND type = $2`,
    [email, userType.local]
  )

  return R.isEmpty(res.rows) ? null : await findUserById(res.rows[0].id)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findUserBy... Remove this comment to see the full error message
const findUserByEmail = async (email: any, client = db) => {
  const res = await client.query(
    `
    SELECT id 
    FROM fra_user 
    WHERE LOWER(email) = LOWER($1)`,
    [email]
  )

  return R.isEmpty(res.rows) ? null : await findUserById(res.rows[0].id, client)
}

const findUserByEmailAndPassword = async (email: any, password: any, client = db) => {
  const res = await client.query(
    `
    SELECT id, password 
    FROM fra_user 
    WHERE LOWER(email) = LOWER($1)
    AND active = $2`,
    [email, true]
  )

  if (!R.isEmpty(res.rows)) {
    const passwordMatch = await bcrypt.compare(password, res.rows[0].password)
    if (passwordMatch) return await findUserById(res.rows[0].id, client)
  }

  return null
}

const updateLanguage = (client: any, lang: any, userInfo: any) =>
  client.query('UPDATE fra_user SET lang = $1 WHERE id = $2', [lang, userInfo.id])

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryUsers = async (countryIso: any) => {
  const usersRes = await db.query(
    `
    SELECT
      u.id,
      u.email,
      u.name,
      u.login_email,
      u.institution,
      u.lang,
      u.active,
      cr.role
    FROM
      fra_user u
    JOIN
      user_country_role cr
      ON
        u.id = cr.user_id
      AND
        cr.country_iso = $1
  `,
    [countryIso]
  )

  const users = camelize(usersRes.rows)

  // add collaborator table access
  const addCollaboratorTablesAccess = async (user: any) => {
    if (user.role === collaborator.role) {
      const tables = await fetchCollaboratorCountryAccessTables(countryIso, user.id)
      return R.assoc('tables', tables, user)
    }
    return user
  }

  return Promise.all(users.map(addCollaboratorTablesAccess))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchAdmin... Remove this comment to see the full error message
const fetchAdministrators = () =>
  db
    .query(
      `
    SELECT
      u.id,
      u.email,
      u.name,
      u.login_email,
      u.lang,
      u.active,
      cr.role
    FROM
      fra_user u
    JOIN
      user_country_role cr
      ON
        u.id = cr.user_id
      AND
        cr.role = 'ADMINISTRATOR'
  `
    )
    .then((res: any) => camelize(res.rows))

const fetchInvitations = (countryIso: any, url: any) =>
  db
    .query(
      `SELECT
       invitation_uuid,
       email,
       name,
       role
     FROM fra_user_invitation
     WHERE country_iso = $1
     AND accepted IS NULL`,
      [countryIso]
    )
    .then((res: any) =>
      camelize(res.rows).map((invitation: any) => ({
        ...invitation,
        invitationLink: loginUrl(invitation, url),
      }))
    )

const fetchUsersAndInvitations = async (countryIso: any, url: any) => {
  const users = await fetchCountryUsers(countryIso)
  const invitations = await fetchInvitations(countryIso, url)
  return [...users, ...invitations]
}

const fetchAllInvitations = async (url: any) => {
  const invitationsRes = await db.query(`
    SELECT
      invitation_uuid,
      email,
      name,
      role,
      country_iso
     FROM fra_user_invitation
     WHERE accepted IS NULL
     `)

  return camelize(invitationsRes.rows).map((invitation: any) => ({
    ...invitation,
    invitationLink: loginUrl(invitation, url),
  }))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchInvit... Remove this comment to see the full error message
const fetchInvitation = async (invitationUUID: any, url = '') => {
  const invitationsRes = await db.query(
    `
    SELECT
      invitation_uuid,
      email,
      name,
      role,
      country_iso
     FROM fra_user_invitation
     WHERE accepted IS NULL
     AND invitation_uuid = $1
     `,
    [invitationUUID]
  )

  return R.isEmpty(invitationsRes.rows)
    ? null
    : R.pipe(R.head, camelize, (invitation: any) => R.assoc('invitationLink', loginUrl(invitation, url), invitation))(
        invitationsRes.rows
      )
}

// fetch all users and invitations
const fetchAllUsersAndInvitations = async (url: any) => {
  const userIdsRes = await db.query(`SELECT DISTINCT u.id FROM fra_user u`)
  const userPromises = userIdsRes.rows.map((row: any) => findUserById(row.id))
  const users = await Promise.all(userPromises)

  const invitations = await fetchAllInvitations(url)

  return [...users, ...invitations]
}

// getUserCounts
const getUserCountsByRole = async (client = db) => {
  const ncRole = nationalCorrespondent.role
  const reviewerRole = reviewer.role
  const collaboratorRole = collaborator.role
  const alternateNCRole = alternateNationalCorrespondent.role

  const roleSelect = (role: any) => `
  ${role} AS (
    SELECT count(*) FROM user_country_role u
    WHERE u.role = '${role}'
  )
  `
  const countsRes = await client.query(`
    WITH
    ${roleSelect(ncRole)}
    , ${roleSelect(reviewerRole)}
    , ${roleSelect(collaboratorRole)}
    , ${roleSelect(alternateNCRole)}
    SELECT
    ${ncRole}.count as ${ncRole},
    ${reviewerRole}.count as ${reviewerRole},
    ${collaboratorRole}.count as ${collaboratorRole},
    ${alternateNCRole}.count as ${alternateNCRole}
    FROM
    ${ncRole}, ${reviewerRole}, ${collaboratorRole}, ${alternateNCRole}
  `)

  const counts = countsRes.rows[0]
  return {
    [ncRole]: counts[ncRole.toLowerCase()],
    [reviewerRole]: counts[reviewerRole.toLowerCase()],
    [collaboratorRole]: counts[collaboratorRole.toLowerCase()],
    [alternateNCRole]: counts[alternateNCRole.toLowerCase()],
  }
}

const getUserProfilePicture = async (userId: any, client = db) => {
  const res = await client.query(
    `
    SELECT 
      profile_picture_file, profile_picture_filename 
    FROM fra_user 
    WHERE id = $1`,
    [userId]
  )

  return R.isEmpty(res.rows)
    ? null
    : {
        data: res.rows[0].profile_picture_file,
        name: res.rows[0].profile_picture_filename,
      }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'password' implicitly has an 'any' type.
const insertUser = (client: any, email: any, name: any, loginEmail: any, password = null) => {
  const type = password ? userType.local : userType.google

  return client.query(
    `
    INSERT INTO
      fra_user(email, name, login_email, password, type)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [email, name, loginEmail, password, type]
  )
}

const getIdOfJustAddedUser = (client: any) => client.query(`SELECT last_value as user_id FROM fra_user_id_seq`)

const addInvitation = async (client: any, user: any, countryIso: any, userToInvite: any) => {
  const invitationUuid = uuidv4()

  // check if user is active
  const inactiveUserRes = await client.query(
    `
  SELECT * FROM fra_user 
  WHERE email = LOWER($1)
  AND active = $2
  `,
    [R.toLower(userToInvite.email), false]
  )
  if (!R.isEmpty(inactiveUserRes.rows)) {
    throw new AccessControlException(`User with email ${userToInvite.email} has been deactivated`)
  }

  await client.query(
    `INSERT INTO
      fra_user_invitation
      (invitation_uuid, email, name, role, country_iso)
     VALUES
     ($1, $2, $3, $4, $5)`,
    [invitationUuid, userToInvite.email, userToInvite.name, userToInvite.role, countryIso]
  )
  await auditRepository.insertAudit(client, user.id, 'addInvitation', countryIso, 'users', {
    user: userToInvite.name,
    role: userToInvite.role,
  })
  return invitationUuid
}

const removeInvitation = async (client: any, user: any, countryIso: any, invitationUuid: any) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  // if (invitationInfo.countryIso !== countryIso) throw new AccessControlException('error.access.countryDoesNotMatch', {countryIso})
  await client.query('DELETE FROM fra_user_invitation WHERE invitation_uuid = $1', [invitationUuid])
  await auditRepository.insertAudit(client, user.id, 'removeInvitation', countryIso, 'users', {
    user: invitationInfo.name,
    role: invitationInfo.role,
  })
}

const updateInvitation = async (client: any, user: any, countryIso: any, userToUpdate: any) => {
  await client.query(
    `UPDATE fra_user_invitation
      SET email = $2, name = $3, role = $4, country_iso = $5
      WHERE invitation_uuid = $1`,
    [userToUpdate.invitationUuid, userToUpdate.email, userToUpdate.name, userToUpdate.role, countryIso]
  )
  await auditRepository.insertAudit(client, user.id, 'updateInvitation', countryIso, 'users', {
    user: userToUpdate.name,
    role: userToUpdate.role,
  })
  return userToUpdate.invitationUuid
}

const updateUserFields = (client: any, userToUpdate: any, profilePictureFile: any) =>
  client.query(
    `
      UPDATE
        fra_user
      SET
        name = $1,
        email = $2,
        institution = $3,
        position = $4,
        profile_picture_file = $5,
        profile_picture_filename = $6,
        active = $7
      WHERE
        id = $8
    `,
    [
      userToUpdate.name,
      userToUpdate.email,
      userToUpdate.institution,
      userToUpdate.position,
      profilePictureFile.data,
      profilePictureFile.name,
      userToUpdate.active,
      userToUpdate.id,
    ]
  )

const updateUser = async (
  client: any,
  user: any,
  countryIso: any,
  userToUpdate: any,
  profilePictureFile: any,
  updateRoles = false
) => {
  await updateUserFields(client, userToUpdate, profilePictureFile)
  if (updateRoles) {
    // removing old roles
    await client.query(`DELETE FROM user_country_role WHERE user_id = $1`, [userToUpdate.id])
    // adding new roles
    const userRolePromises = userToUpdate.roles.map((userRole: any) =>
      client.query(
        `INSERT INTO user_country_role
      (user_id, country_iso, role)
      VALUES($1, $2, $3)`,
        [userToUpdate.id, userRole.countryIso, userRole.role]
      )
    )
    await Promise.all(userRolePromises)
    // insert audit
    await auditRepository.insertAudit(client, user.id, 'updateUser', countryIso, 'users', { user: userToUpdate.name })
  }
}

const removeUser = async (client: any, user: any, countryIso: any, userId: any) => {
  const userToRemove = await findUserById(userId, client)
  await client.query(
    `
        DELETE FROM
          user_country_role
        WHERE
          user_id = $1
  `,
    [userId]
  )

  await client.query(`DELETE FROM fra_user WHERE id = $1`, [userId])

  await auditRepository.insertAudit(client, user.id, 'removeUser', countryIso, 'users', { user: userToRemove.name })
}

const getInvitationInfo = async (client: any, invitationUuid: any) => {
  const invitationInfo = await client.query(
    `SELECT country_iso, name, role, accepted, email
      FROM fra_user_invitation
      WHERE invitation_uuid = $1`,
    [invitationUuid]
  )
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
  if (invitationInfo.rows.length !== 1) throw new Error('Invalid invitation uuid', invitationUuid)
  return camelize(invitationInfo.rows[0])
}

const setInvitationAccepted = (client: any, invitationUuid: any) =>
  client.query(
    `UPDATE fra_user_invitation
      SET accepted = now()
     WHERE invitation_uuid = $1`,
    [invitationUuid]
  )

const addUserCountryRole = (client: any, userId: any, countryIso: any, role: any) =>
  client.query(
    `INSERT INTO user_country_role
      (user_id, country_iso, role)
      VALUES
      ($1, $2, $3)`,
    [userId, countryIso, role]
  )

const addNewUserBasedOnInvitation = async (client: any, invitationUuid: any, loginEmail: any, password: any) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (invitationInfo.accepted)
    throw new AccessControlException('error.access.invitationAlreadyUsed', {
      loginEmail,
      invitationUuid,
    })
  await insertUser(client, invitationInfo.email, invitationInfo.name, loginEmail, password)
  const userIdResult = await getIdOfJustAddedUser(client)
  const userId = userIdResult.rows[0].user_id
  await addUserCountryRole(client, userId, invitationInfo.countryIso, invitationInfo.role)
  await setInvitationAccepted(client, invitationUuid)
  await addAcceptToAudit(client, userId, invitationInfo)
  return userId
}

const addAcceptToAudit = (client: any, userId: any, invitationInfo: any) =>
  auditRepository.insertAudit(client, userId, 'acceptInvitation', invitationInfo.countryIso, 'users', {
    user: invitationInfo.name,
    role: invitationInfo.role,
  })

const addCountryRoleAndUpdateUserBasedOnInvitation = async (client: any, user: any, invitationUuid: any) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (invitationInfo.accepted) return // Invitation is already accepted, just allow the user to log in normally
  const profilePicture = await getUserProfilePicture(user.id, client)
  await updateUserFields(client, { ...invitationInfo, id: user.id }, profilePicture)
  await addUserCountryRole(client, user.id, invitationInfo.countryIso, invitationInfo.role)
  await setInvitationAccepted(client, invitationUuid)
  await addAcceptToAudit(client, user.id, invitationInfo)
}

const acceptInvitation = async (client: any, invitationUuid: any, loginEmail: any) => {
  const user = await findUserByLoginEmail(loginEmail, client)
  if (user) {
    await addCountryRoleAndUpdateUserBasedOnInvitation(client, user, invitationUuid)
    return user
  } else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    await addNewUserBasedOnInvitation(client, invitationUuid, loginEmail)
    const user = await findUserByLoginEmail(loginEmail, client)
    return user
  }
}

const findLocalUserByInvitation = async (client: any, invitationUUID: any) => {
  const invitation = await fetchInvitation(invitationUUID)
  if (invitation) return await findLocalUserByEmail(invitation.email, client)
  return null
}

const acceptInvitationLocalUser = async (client: any, invitationUUID: any, password: any) => {
  const user = await findLocalUserByInvitation(client, invitationUUID)
  if (user) {
    await addCountryRoleAndUpdateUserBasedOnInvitation(client, user, invitationUUID)
    return user
  } else {
    const userId = await addNewUserBasedOnInvitation(client, invitationUUID, null, password)
    const user = await findUserById(userId, client)
    return user
  }
}

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByLoginEmail,
  findLocalUserByEmail,
  findUserByEmailAndPassword,
  updateLanguage,
  fetchCountryUsers,
  fetchAdministrators,
  getUserProfilePicture,
  addInvitation,
  updateInvitation,
  removeInvitation,
  updateUser,
  removeUser,
  acceptInvitation,
  addCountryRoleAndUpdateUserBasedOnInvitation,
  fetchUsersAndInvitations,
  fetchAllUsersAndInvitations,
  fetchAllInvitations,
  fetchInvitation,
  getUserCountsByRole,
  acceptInvitationLocalUser,
}
