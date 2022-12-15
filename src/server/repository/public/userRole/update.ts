import { RoleName, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const update = async (
  props: { cycleUuid?: string; roles: Array<Partial<UserRole<RoleName>>>; userId: number },
  client: BaseProtocol = DB
): Promise<void> => {
  const { cycleUuid, roles, userId } = props

  if (cycleUuid) {
    const doNotDelete = roles
      .reduce((prev, curr) => {
        if (curr.id) prev.push(curr.id)
        return prev
      }, [])
      .join(',')

    await client.query(
      `
      delete from public.users_role
      where user_id = $1 and cycle_uuid = $2
      ${doNotDelete !== '' ? ` and id not in (${doNotDelete})` : ''}
    `,
      [userId, cycleUuid]
    )
  } else {
    await client.query(`delete from public.users_role where user_id = $1`, [userId])
  }

  const userRolePromises = roles
    .filter((userRole) => !!userRole)
    .map((userRole: UserRole<RoleName>) =>
      client.query(
        `
          insert into public.users_role (user_id, assessment_id, cycle_uuid, country_iso, role, accepted_at)
          values ($1, $2, $3, $4, $5, now())
          on conflict (user_id, assessment_id, cycle_uuid, country_iso) do nothing 
        `,
        [userId, userRole.assessmentId, userRole.cycleUuid, userRole.countryIso, userRole.role]
      )
    )

  await Promise.all(userRolePromises)
}
