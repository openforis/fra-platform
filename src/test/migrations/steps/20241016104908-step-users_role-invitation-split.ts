import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { ActivityLog } from 'meta/assessment'
import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
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

type ActivityLogEntry = ActivityLog<{
  userId: number
  roles: Array<DBActivityLogRole>
}>

const client: BaseProtocol = DB

const _handleRole = async (
  role: DBRole,
  cycles: Record<string, string>,
  activityLogsEntries: Record<number, Array<ActivityLogEntry>>
): Promise<DBRole> => {
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

  const activityLogEntries = activityLogsEntries[role.userId]

  // It is possible we don't have any matches, e.g. Roles for FRA 2020 added by admin
  if (!activityLogEntries || activityLogEntries.length === 0) {
    // eslint-disable-next-line no-param-reassign
    role.createdAt = cycles[role.cycleUuid]
    return role
  }

  // find in which activity log entry the role was first seen
  const firstActivityLogEntry = activityLogEntries.find((entry) =>
    entry.target.roles.some((r: DBActivityLogRole) => r.countryIso === role.countryIso)
  )

  if (!firstActivityLogEntry) {
    // eslint-disable-next-line no-param-reassign
    role.createdAt = cycles[role.cycleUuid]
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

  // Utility consts to avoid fetching data multiple times
  const assessments = await AssessmentRepository.getAll({}, client)
  // [cycleUuid]: dateCreated
  const cycleUuidMap: Record<string, string> = Object.fromEntries(
    assessments.flatMap((assessment) => assessment.cycles.map((cycle) => [cycle.uuid, cycle.props.dateCreated]))
  )
  // [activityLogEntry]
  const _activityLogsEntries = await client.manyOrNone(`
    select * from public.activity_log where message = 'userRolesUpdate' order by time asc
    `)
  // [userId]: [activityLogEntry]
  const activityLogsEntries: Record<number, Array<ActivityLogEntry>> = _activityLogsEntries.reduce((acc, entry) => {
    const { userId } = entry.target
    // eslint-disable-next-line no-param-reassign
    if (!acc[userId]) acc[userId] = []
    acc[userId].push(entry)
    return acc
  }, {} as Record<number, Array<ActivityLogEntry>>)

  const roles = await Promise.all(_roles.map((role) => _handleRole(role, cycleUuidMap, activityLogsEntries)))
  const columns = [
    'user_uuid',
    'assessment_uuid',
    'country_iso',
    'role',
    'cycle_uuid',
    'permissions',
    'props',
    'created_at',
    'invitation_uuid',
  ].map((name) => ({ name, prop: Objects.camelize(name) }))

  const options = { table: { table: 'users_role', schema: 'public' } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = pgp.helpers.insert(roles, cs)
  await client.none(query)
}
