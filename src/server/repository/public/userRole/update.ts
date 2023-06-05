import { CountryIso } from 'meta/area'
import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const update = async (
  props: { cycleUuid?: string; roles: Array<Partial<UserRole<RoleName>>>; userId: number },
  client: BaseProtocol = DB
): Promise<void> => {
  const { cycleUuid, roles, userId } = props

  if (cycleUuid) {
    const doNotDelete: Array<number> = []
    const newCountryRoles: Array<CountryIso> = []

    roles.forEach((curr) => {
      if (curr.id) doNotDelete.push(Number(curr.id))
      else if (curr.countryIso) newCountryRoles.push(curr.countryIso)
    })

    const pendingInvitations = await client.map<number>(
      `
        select id from public.users_role
        where user_id = $1 and cycle_uuid = $2
        and invited_at is not null and accepted_at is null
        ${
          newCountryRoles.length !== 0
            ? ` and country_iso not in (${newCountryRoles.map((countryRole) => `'${countryRole}'`).join(',')})`
            : ''
        }
      `,
      [userId, cycleUuid],
      ({ id }) => id
    )

    pendingInvitations.forEach((id) => {
      if (!doNotDelete.includes(id)) doNotDelete.push(id)
    })

    await client.query(
      `
        delete from public.users_role
        where user_id = $1 and cycle_uuid = $2
        ${doNotDelete.length !== 0 ? ` and id not in (${doNotDelete.join(',')})` : ''}
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
