import { RoleName, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const update = async (
  props: { roles: Array<Partial<UserRole<RoleName>>>; userId: number },
  client: BaseProtocol = DB
): Promise<void> => {
  const { roles, userId } = props

  await client.query(`delete from users_role WHERE user_id = $1`, [userId])

  const userRolePromises = roles
    .filter((userRole) => !!userRole)
    .map((userRole: UserRole<RoleName>) =>
      client.query(
        `insert into users_role (user_id, assessment_id, cycle_uuid, country_iso, role, accepted_at) values ($1, $2, $3, $4, $5, now())`,
        [userId, userRole.assessmentId, userRole.cycleUuid, userRole.countryIso, userRole.role]
      )
    )

  await Promise.all(userRolePromises)
}
