import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getMany = async (
  props: {
    countryIso?: CountryIso
    assessment?: Assessment
    cycle?: Cycle
    limit?: number
    offset?: number
    countries?: Array<CountryIso>
    fullName?: string
    roles?: Array<RoleName>
    administrators?: boolean
  },
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { countryIso, assessment, cycle, limit, offset, countries, fullName, roles, administrators } = props

  const selectedCountries = !Objects.isEmpty(countries) ? countries.map((countryIso) => `'${countryIso}'`).join(',') : null

  const selectedRoles = !Objects.isEmpty(roles) ? roles.map((roleName) => `'${roleName}'`).join(',') : null

  const whereConditions: Array<string> = []

  if (administrators) {
    whereConditions.push(`(
    (ur.assessment_id = $1
    and ur.cycle_uuid = $2
    and ((accepted_at is not null and invited_at is not null) or invited_at is null)
    )
   or (ur.role = '${RoleName.ADMINISTRATOR}')
    )`)
  } else {
    whereConditions.push('ur.assessment_id = $1')
    whereConditions.push('ur.cycle_uuid = $2')
  }

  if (selectedCountries) {
    whereConditions.push(`ur.country_iso in (${selectedCountries})`)
  }

  if (selectedRoles) {
    whereConditions.push(`ur.role in (${selectedRoles})`)
  }

  if (fullName) {
    whereConditions.push(`concat(u.props->'name', ' ', u.props->'surname') ilike '%${fullName}%'`)
  }

  if (countryIso) {
    whereConditions.push(`u.id in (
    select user_id
    from public.users_role
    where assessment_id = $1
      and cycle_uuid = $2
      and country_iso = $3
    )`)
  }

  const query = `
      select ${selectFields}, jsonb_agg(to_jsonb(ur.*) - 'props') as roles
      from public.users u
               join public.users_role ur on (u.id = ur.user_id)
      where ${whereConditions.join(`
      and
      `)}
      group by ${selectFields}
      order by concat(u.props->'name', ' ', u.props->'surname')
                   ${limit ? `limit ${limit}` : ''}
                   ${offset ? `offset ${offset}` : ''}
  `

  const queryParams = countryIso ? [assessment.id, cycle.uuid, countryIso] : [assessment.id, cycle.uuid]

  return client.manyOrNone<User>(query, queryParams).then((data) =>
    data.map(({ roles, ...user }) => ({
      ...Objects.camelize(user),
      roles: roles.map(UserRoleAdapter),
    }))
  )
}
