import { RoleName, User, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const update = async (props: { user: User }, client: BaseProtocol = DB): Promise<void> => {
  const {
    user: { id, roles },
  } = props

  await client.query(`delete from users_role WHERE user_id = $1`, [id])

  const userRolePromises = roles
    .filter((userRole) => !!userRole)
    .map((userRole: UserRole<RoleName>) =>
      client.query(
        `insert into users_role (user_id, assessment_id, cycle_uuid, country_iso, role, accepted_at) values ($1, $2, $3, $4, $5, now())`,
        [id, userRole.assessmentId, userRole.cycleUuid, userRole.countryIso, userRole.role]
      )
    )

  await Promise.all(userRolePromises)
}
