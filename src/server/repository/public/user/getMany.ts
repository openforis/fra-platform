import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { CollaboratorProps, User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

const fields: Array<string> = ['lang', 'id', 'name', 'status', 'position', 'email', 'institution']

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getMany = async (
  props: { countryIso?: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { countryIso, assessment, cycle } = props

  return client
    .manyOrNone<User>(
      `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
          join public.users_role ur on (u.id = ur.user_id)
        where ur.assessment_id = $1
          and ur.cycle_uuid = $2
          ${countryIso ? 'and ur.country_iso = $3' : ''}
        group by ${selectFields}
    `,
      countryIso ? [(assessment.id, cycle.uuid)] : [(assessment.id, cycle.uuid, countryIso)]
    )
    .then((data) =>
      data.map(({ roles, ...user }) => ({
        ...Objects.camelize(user),
        roles: roles.map(({ props, ...role }) => ({
          ...Objects.camelize(role),
          props: { ...Objects.camelize(props), sections: (props as CollaboratorProps).sections },
        })),
      }))
    )
}
