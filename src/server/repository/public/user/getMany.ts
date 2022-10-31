import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { CollaboratorProps, User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getMany = async (
  props: { countryIso?: CountryIso; assessment?: Assessment; cycle?: Cycle; limit?: number; offset?: number },
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { countryIso, assessment, cycle, limit, offset } = props

  let query = ''
  let queryParams = []

  if (assessment && cycle) {
    query = `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
          join public.users_role ur on (u.id = ur.user_id)
        where ur.assessment_id = $1
          and ur.cycle_uuid = $2
          ${
            countryIso
              ? `and u.id in (
                  select user_id
                  from public.users_role
                  where assessment_id = $1
                    and cycle_uuid = $2
                    and country_iso = $3
                )`
              : ''
          }
        group by ${selectFields}
        ${limit ? `limit ${limit}` : ''}
        ${offset ? `offset ${offset}` : ''}
    `
    queryParams = countryIso ? [assessment.id, cycle.uuid, countryIso] : [assessment.id, cycle.uuid]
  } else {
    query = `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
          join public.users_role ur on (u.id = ur.user_id)
          ${
            countryIso
              ? `where u.id in (
                  select user_id
                  from public.users_role
                  where country_iso = $1
                )`
              : ''
          }
        group by ${selectFields}
        ${limit ? `limit ${limit}` : ''}
        ${offset ? `offset ${offset}` : ''}
    `
    queryParams = countryIso ? [countryIso] : []
  }

  return client.manyOrNone<User>(query, queryParams).then((data) =>
    data.map(({ roles, ...user }) => ({
      ...Objects.camelize(user),
      roles: roles.map(({ props, ...role }) => ({
        ...Objects.camelize(role),
        props: { ...Objects.camelize(props), sections: (props as CollaboratorProps).sections },
      })),
    }))
  )
}
