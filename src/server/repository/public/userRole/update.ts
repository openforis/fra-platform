import { CountryIso } from 'meta/area'
import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

type Props = { cycleUuid?: string; roles: Array<Partial<UserRole<RoleName>>>; userUuid: string }

export const update = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { cycleUuid, roles, userUuid } = props

  if (cycleUuid) {
    const doNotDelete: Array<number> = []
    const newCountryRoles: Array<CountryIso> = []

    roles.forEach((curr) => {
      if (curr.id) doNotDelete.push(Number(curr.id))
      else if (curr.countryIso) newCountryRoles.push(curr.countryIso)
    })

    await client.query(
      `
        delete from public.users_role
        where user_uuid = $1 and cycle_uuid = $2
        ${doNotDelete.length !== 0 ? ` and id not in (${doNotDelete.join(',')})` : ''}
    `,
      [userUuid, cycleUuid]
    )
  } else {
    await client.query(`delete from public.users_role where user_uuid = $1`, [userUuid])
  }

  const userRolePromises = roles
    .filter((userRole) => !!userRole)
    .map((userRole: UserRole<RoleName>) =>
      client.query(
        `
            insert into public.users_role (user_uuid, assessment_uuid, cycle_uuid, country_iso, role, created_at)
            values ($1, $2, $3, $4, $5, now()) on conflict (user_uuid, assessment_uuid, cycle_uuid, country_iso) do update
            set role = $5
        `,
        [userUuid, userRole.assessmentUuid, userRole.cycleUuid, userRole.countryIso, userRole.role]
      )
    )

  await Promise.all(userRolePromises)
}
