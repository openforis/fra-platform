import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const create = async (
  props: {
    user: Pick<User, 'id'>
    assessment: Pick<Assessment, 'id'>
    country: CountryIso
    role: RoleName
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const {
    user: { id: userId },
    assessment: { id: assessmentId },
    country,
    role,
    cycle,
  } = props

  return client.one<UserRole<RoleName>>(
    `
        insert into public.users_role (
            user_id, assessment_id, country_iso, role, props, cycle_uuid)
            values ($1, $2, $3, $4, $5, $6)
            returning *;
    `,
    [userId, assessmentId, country, role, {}, cycle.uuid],
    Objects.camelize
  )
}
