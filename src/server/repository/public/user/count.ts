import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, UserStatus } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { buildGetManyQuery } from './getMany'
import { UserQueryParams } from './UserQueryParams'

type Props = {
  administrators?: boolean
  assessment: Assessment
  countries?: Array<CountryIso>
  cycle: Cycle
  fullName?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
}

type Returned = {
  total: number
} & Record<RoleName, number>

export const count = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle, fullName, countries, roles, administrators } = props
  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const queryParams: UserQueryParams = {}

  const allRoles = administrators
    ? Object.values(RoleName)
    : Object.values(RoleName).filter((role) => role !== RoleName.ADMINISTRATOR)
  queryParams.roles = !Objects.isEmpty(roles) ? roles : allRoles

  if (fullName) queryParams.fullName = fullName.trim().toLowerCase()

  const conditions: Array<string> = []
  if (Objects.isEmpty(countries)) {
    conditions.push(`(country_iso is null or country_iso not like 'X%')`)
  } else {
    queryParams.countries = countries
    conditions.push(`country_iso in ($(countries:csv))`)
  }

  if (!Objects.isEmpty(fullName)) conditions.push(`full_name ilike '%' || $(fullName) || '%'`)

  conditions.push(`(
    (role is not null and role ->> 'role' in ($(roles:csv)))
    or 
    (invitation is not null and invitation ->> 'role' in ($(roles:csv)))
  )`)

  const queryRoles = `
    with counts as (
      select count(distinct (id)) as totals, coalesce(role ->> 'role', invitation ->> 'role') as role
      from ${schemaName}.country_user_summary
      where ${conditions.join(' and ')}
      group by role ->> 'role', invitation ->> 'role'
    )
    select jsonb_object_agg(counts.role, counts.totals) as result
    from counts`

  const { query: subQueryTotals, queryParams: queryTotalsParams } = buildGetManyQuery(props)

  const queryTotals = `
    select count(*) as total
    from (${subQueryTotals}) as users`

  const total = await client.one<number>(queryTotals, queryTotalsParams, ({ total }) => total)
  const roleTotals = await client.one<Record<RoleName, number>>(queryRoles, queryParams, ({ result }) => result)

  return { total, ...roleTotals }
}
