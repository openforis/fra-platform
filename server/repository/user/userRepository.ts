import { v4 as uuidv4 } from 'uuid'
// @ts-ignore
import * as camelize from 'camelize'

import * as R from 'ramda'
import * as bcrypt from 'bcrypt'

import { QueryResult } from 'pg'
import FRA from '@common/assessment/fra'

import { nationalCorrespondent, reviewer, collaborator, alternateNationalCorrespondent } from '@common/countryRole'
import { userType } from '@common/userUtils'
import { CountryService } from '@server/service'
import * as db from '../../db/db_deprecated'
import * as auditRepository from '../audit/auditRepository'
import { fetchCollaboratorCountryAccessTables } from '../collaborators/collaboratorsRepository'
import { AccessControlException } from '../../utils/accessControl'

import { loginUrl } from '../../user/sendInvitation'

export const findUserById = async (userId: any, client = db.pool) => {
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
    [FRA.type]: await CountryService.getAllowedCountries(roles),
  }
  // TODO: Refactor backend to use role
  // roles is left here because it is used widely
  return { ...resultUser, role, roles }
}

export const findUserByLoginEmail = (loginEmail: any, client = db.pool) =>
  client
    .query(
      `SELECT id 
    FROM fra_user 
    WHERE LOWER(login_email) in ($1) 
    AND active = $2`,
      [loginEmail, true]
    )
    .then((res: any) => (res.rows.length > 0 ? findUserById(res.rows[0].id, client) : null))

export const findLocalUserByEmail = async (email: any, client = db.pool) => {
  const res: QueryResult<{ id: number }> = await client.query(
    `
    SELECT id
    FROM fra_user 
    WHERE LOWER(email) = LOWER($1)
    AND type = $2`,
    [email, userType.local]
  )

  return R.isEmpty(res.rows) ? null : await findUserById(res.rows[0].id)
}

export const findUserByEmail = async (email: any, client = db.pool) => {
  const res = await client.query(
    `
    SELECT id 
    FROM fra_user 
    WHERE LOWER(email) = LOWER($1)`,
    [email]
  )

  return R.isEmpty(res.rows) ? null : await findUserById(res.rows[0].id, client)
}

export const findUserByEmailAndPassword = async (email: any, password: any, client = db.pool) => {
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

export const updateLanguage = (client: any, lang: any, userInfo: any) =>
  client.query('UPDATE fra_user SET lang = $1 WHERE id = $2', [lang, userInfo.id])

export const fetchCountryUsers = async (countryIso: any) => {
  const usersRes = await db.pool.query(
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

export const fetchAdministrators = () =>
  db.pool
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

export const fetchInvitations = (countryIso: any, url: any) =>
  db.pool
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

export const fetchUsersAndInvitations = async (countryIso: any, url: any) => {
  const users = await fetchCountryUsers(countryIso)
  const invitations = await fetchInvitations(countryIso, url)
  return [...users, ...invitations]
}

export const fetchAllInvitations = async (url: any) => {
  const invitationsRes = await db.pool.query(`
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

export const fetchInvitation = async (invitationUUID: any, url = '') => {
  const invitationsRes = await db.pool.query(
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
export const fetchAllUsersAndInvitations = async (url: any) => {
  const userIdsRes = await db.pool.query(`SELECT DISTINCT u.id FROM fra_user u`)
  const userPromises = userIdsRes.rows.map((row: any) => findUserById(row.id))
  const users = await Promise.all(userPromises)

  const invitations = await fetchAllInvitations(url)

  return [...users, ...invitations]
}

// getUserCounts
export const getUserCountsByRole = async (client = db.pool) => {
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

export const getUserProfilePicture = async (userId: any, client = db.pool) => {
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

export const insertUser = (client: any, email: any, name: any, loginEmail: any, password: string | null = null) => {
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

export const getIdOfJustAddedUser = (client: any) => client.query(`SELECT last_value as user_id FROM fra_user_id_seq`)

export const addInvitation = async (client: any, user: any, countryIso: any, userToInvite: any) => {
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
    // @ts-ignore
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

export const removeInvitation = async (client: any, user: any, countryIso: any, invitationUuid: any) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  // if (invitationInfo.countryIso !== countryIso) throw new AccessControlException('error.access.countryDoesNotMatch', {countryIso})
  await client.query('DELETE FROM fra_user_invitation WHERE invitation_uuid = $1', [invitationUuid])
  await auditRepository.insertAudit(client, user.id, 'removeInvitation', countryIso, 'users', {
    user: invitationInfo.name,
    role: invitationInfo.role,
  })
}

export const updateInvitation = async (client: any, user: any, countryIso: any, userToUpdate: any) => {
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

export const updateUserFields = (client: any, userToUpdate: any, profilePictureFile: any) =>
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

export const updateUser = async (
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

export const removeUser = async (client: any, user: any, countryIso: any, userId: any) => {
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

export const getInvitationInfo = async (client: any, invitationUuid: any) => {
  const invitationInfo = await client.query(
    `SELECT country_iso, name, role, accepted, email
      FROM fra_user_invitation
      WHERE invitation_uuid = $1`,
    [invitationUuid]
  )

  if (invitationInfo.rows.length !== 1) throw new Error(`Invalid invitation uuid ${invitationUuid}`)
  return camelize(invitationInfo.rows[0])
}

export const setInvitationAccepted = (client: any, invitationUuid: any) =>
  client.query(
    `UPDATE fra_user_invitation
      SET accepted = now()
     WHERE invitation_uuid = $1`,
    [invitationUuid]
  )

export const addUserCountryRole = (client: any, userId: any, countryIso: any, role: any) =>
  client.query(
    `INSERT INTO user_country_role
      (user_id, country_iso, role)
      VALUES
      ($1, $2, $3)`,
    [userId, countryIso, role]
  )

export const addNewUserBasedOnInvitation = async (
  client: any,
  invitationUuid: any,
  loginEmail: any,
  password?: any
) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (invitationInfo.accepted)
    // @ts-ignore
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

export const addAcceptToAudit = (client: any, userId: any, invitationInfo: any) =>
  auditRepository.insertAudit(client, userId, 'acceptInvitation', invitationInfo.countryIso, 'users', {
    user: invitationInfo.name,
    role: invitationInfo.role,
  })

export const addCountryRoleAndUpdateUserBasedOnInvitation = async (client: any, user: any, invitationUuid: any) => {
  const invitationInfo = await getInvitationInfo(client, invitationUuid)
  if (invitationInfo.accepted) return // Invitation is already accepted, just allow the user to log in normally
  const profilePicture = await getUserProfilePicture(user.id, client)
  await updateUserFields(client, { ...invitationInfo, id: user.id }, profilePicture)
  await addUserCountryRole(client, user.id, invitationInfo.countryIso, invitationInfo.role)
  await setInvitationAccepted(client, invitationUuid)
  await addAcceptToAudit(client, user.id, invitationInfo)
}

export const acceptInvitation = async (client: any, invitationUuid: any, loginEmail: any) => {
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

export const findLocalUserByInvitation = async (client: any, invitationUUID: any) => {
  const invitation = await fetchInvitation(invitationUUID)
  if (invitation) return await findLocalUserByEmail(invitation.email, client)
  return null
}

export const acceptInvitationLocalUser = async (client: any, invitationUUID: any, password: any) => {
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

export default {
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
