import * as pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserEditFormRoles } from 'meta/form/userEdit/form'
import { Users } from 'meta/user'
import { User } from 'meta/user/user'
import { RoleName, UserRole } from 'meta/user/userRole'
import { UserRoles } from 'meta/user/userRoles'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRoleAdapter } from 'server/db/repository/adapter'

type Props = {
  assessment: Assessment
  cycle: Cycle
  roles: UserEditFormRoles
  user: User
}

export const updateRoles = async (props: Props, client: BaseProtocol = DB): Promise<Array<UserRole>> => {
  const { assessment, cycle, roles, user } = props
  const { uuid: assessmentUuid } = assessment
  const { uuid: cycleUuid } = cycle
  const { uuid: userUuid } = user

  if ([true, 'true'].includes(roles.ADMINISTRATOR)) {
    // delete all roles and insert admin role
    await client.query(`delete from users_role where user_uuid = $1`, [userUuid])

    return client.map<UserRole>(
      `insert into users_role (user_uuid, role)
       values ($1, $2)
       returning *`,
      [userUuid, RoleName.ADMINISTRATOR],
      UserRoleAdapter
    )
  }

  delete roles.ADMINISTRATOR
  const roleEntries = Object.entries(roles)

  // delete old roles
  const countryISOs = roleEntries.flatMap(([_, value]) => value as Array<CountryIso>)

  await client.query(
    `delete
     from users_role
     where user_uuid = $1
       and (
       (assessment_uuid = $2
         and cycle_uuid = $3
         and country_iso not in ($4:csv)
         ) or role = $5
       )
    `,
    [userUuid, assessmentUuid, cycleUuid, countryISOs, RoleName.ADMINISTRATOR]
  )

  // insert roles
  const pgp = pgPromise()
  const columns = [
    'assessment_uuid',
    'cycle_uuid',
    'country_iso',
    'role',
    'user_uuid',
    { name: 'permissions', cast: 'jsonb' },
  ]
  const table = { table: 'users_role', schema: 'public' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })
  const inserts = roleEntries.flatMap(([role, countryISOs]) => {
    return (countryISOs as Array<CountryIso>).map((countryIso) => {
      let permissions = {}
      // if user has already the collaborator role, get permissions from the current role, otherwise default ones
      if (role === RoleName.COLLABORATOR) {
        permissions = Users.isCollaborator(user, countryIso, cycle)
          ? Users.getRole(user, countryIso, cycle).permissions
          : UserRoles.getDefaultCollaboratorPermissions()
      }

      return {
        assessment_uuid: assessmentUuid,
        cycle_uuid: cycleUuid,
        country_iso: countryIso,
        role,
        user_uuid: userUuid,
        permissions,
      }
    })
  })

  const query = `${pgp.helpers.insert(inserts, cs)} on conflict (user_uuid, assessment_uuid, cycle_uuid, country_iso)
            do update set "role" = excluded."role", "permissions" = excluded."permissions" returning *`
  return client.map<UserRole>(query, [], UserRoleAdapter)
}
