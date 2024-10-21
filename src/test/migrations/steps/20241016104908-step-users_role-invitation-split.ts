import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { getUsersInvitationDDL, getUsersRoleDDL } from 'server/repository/public/ddl/getCreatePublicSchemaDDL'
import { Logger } from 'server/utils/logger'

type DBRole = {
  userId: number
  userUuid: string
  assessmentUuid: string
  countryIso: string
  role: string
  cycleUuid: string
  permissions: string
  props: string
  createdAt: string
  invitationUuid: string
}

type DBActivityLogRole = UserRole<RoleName>

const client: BaseProtocol = DB

const _handleRole = async (role: DBRole): Promise<DBRole> => {
  // Role created by admin
  if (role.invitationUuid) {
    if (!role.createdAt) {
      throw new Error(`Created at is null for invitation role: ${JSON.stringify(role)}`)
    }
    return role
  }

  // Role created through invitation
  if (role.createdAt) {
    return role
  }

  // Get all activity log entries for current roles user (match through userId and message)
  const activityLogEntries = await client.manyOrNone(`
    select * from public.activity_log where  (target->>'userId')::integer =  ${role.userId} and message = 'userRolesUpdate' order by time asc
  `)

  // It is possible we don't have any matches, e.g. Roles for FRA 2020 added by admin
  if (activityLogEntries.length === 0) {
    Logger.warn(
      `No activity log entry found for role: countryIso=${role.countryIso}, role=${role.role}, userUuid=${role.userUuid}`
    )
    return role
  }

  // find in which activity log entry the role was first seen
  const firstActivityLogEntry = activityLogEntries.find((entry) =>
    entry.target.roles.some((r: DBActivityLogRole) => r.countryIso === role.countryIso)
  )

  if (!firstActivityLogEntry) {
    Logger.warn(
      `No activity log entry found for role ${role.countryIso} - ${JSON.stringify(role.role)} - ${role.userUuid}`
    )
    return role
  }

  // eslint-disable-next-line no-param-reassign
  role.createdAt = firstActivityLogEntry.time

  return role
}

export default async () => {
  // ---- 0. Check that the migration is not already ran
  const queryExists = `select exists (select from information_schema.tables where table_schema = 'public' and table_name = 'users_invitation');`
  const { exists } = await client.oneOrNone(queryExists)
  if (exists) {
    Logger.info('users_invitation table already exists')
    return
  }

  const pgp = pgPromise()

  // ---- 1. Add unique index on users (uuid) table
  await client.query(`create unique index if not exists users_uuid_key on public.users (uuid);`)

  // ---- 2. Move users_role table to _legacy schema
  await client.query(`alter table public.users_role set schema _legacy;`)

  // ---- 3. Create users_invitation table
  await client.query(getUsersInvitationDDL())

  // ---- 4. Create new users_role table in public schema
  await client.query(getUsersRoleDDL())

  // ---- 5. Populate users_invitation table from _legacy
  await client.query(`
    insert into public.users_invitation (
      uuid, user_uuid, assessment_uuid, country_iso, role, cycle_uuid, invited_at, accepted_at, invited_by_user_uuid, props
    )
    select 
      l_ur.invitation_uuid, 
      (select uuid from public.users where id = l_ur.user_id),
      (select uuid from public.assessment where id = l_ur.assessment_id),
      l_ur.country_iso, 
      l_ur.role, 
      l_ur.cycle_uuid, 
      l_ur.invited_at, 
      l_ur.accepted_at, 
      l_ur.invited_by_user_uuid,
      l_ur.props
    from _legacy.users_role l_ur
    where l_ur.invitation_uuid is not null;
  `)

  // ---- 6. Populate new users_role table from _legacy
  const _roles: Array<DBRole> = await client.map<DBRole>(
    `
    select
      l_ur.user_id as user_id, -- used for activity log matching
      u.uuid as user_uuid,
      (select uuid from public.assessment where id = l_ur.assessment_id) as assessment_uuid,
      l_ur.country_iso,
      l_ur.role,
      l_ur.cycle_uuid,
      l_ur.permissions,
      l_ur.props,
      l_ur.accepted_at as created_at,
      l_ur.invitation_uuid
    from _legacy.users_role l_ur
    join public.users u on u.id = l_ur.user_id
    -- To migrate a role:
    -- either accepted at exists or invitation uuid doesn't exist
    -- user must not be pending invitation
    where (l_ur.accepted_at is not null or l_ur.invitation_uuid is null) and u.status != 'invitationPending'
  `,
    [],
    (row) => Objects.camelize(row)
  )

  const roles = await Promise.all(_roles.map((role) => _handleRole(role)))
  const columns = [
    { name: 'user_uuid', prop: 'userUuid' },
    { name: 'assessment_uuid', prop: 'assessmentUuid' },
    { name: 'country_iso', prop: 'countryIso' },
    { name: 'role', prop: 'role' },
    { name: 'cycle_uuid', prop: 'cycleUuid' },
    { name: 'permissions', prop: 'permissions' },
    { name: 'props', prop: 'props' },
    { name: 'created_at', prop: 'createdAt' },
    { name: 'invitation_uuid', prop: 'invitationUuid' },
  ]

  const options = { table: { table: 'users_role', schema: 'public' } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = pgp.helpers.insert(roles, cs)
  await client.none(query)
}
