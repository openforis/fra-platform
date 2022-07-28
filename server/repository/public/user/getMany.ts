import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

const fields: Array<string> = ['lang', 'id', 'name', 'status', 'position', 'email', 'institution']

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getMany = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { countryIso, assessment, cycle } = props

  return client
    .manyOrNone<User>(
      `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
          join public.users_role ur on (u.id = ur.user_id)
        where ur.country_iso = $1
          and ur.assessment_id = $2
          and ur.cycle_uuid = $3
        group by ${selectFields}
    `,
      [countryIso, assessment.id, cycle.uuid]
    )
    .then(Objects.camelize)
}
