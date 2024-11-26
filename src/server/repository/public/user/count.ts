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

  if (fullName) queryParams.fullName = fullName.trim().toLowerCase()
  const hasCountries = countries && countries.length > 0
  if (hasCountries) queryParams.countries = countries

  const allRoles = administrators
    ? Object.values(RoleName)
    : Object.values(RoleName).filter((role) => role !== RoleName.ADMINISTRATOR)

  const selectedRoles = !Objects.isEmpty(roles) ? roles : allRoles
  if (selectedRoles) queryParams.roles = selectedRoles

  const whereConditions = [
    fullName && `full_name ilike '%' || $(fullName) || '%'`,
    selectedRoles &&
      `(
      (role is not null and role ->> 'role' in ($(roles:list)))
      or 
      (invitation is not null and invitation ->> 'role' in ($(roles:list)))
    )`,
    hasCountries && `country_iso in ($(countries:list))`,
  ].filter(Boolean)

  const queryRoles = `
      with filtered_users as (
          select distinct uuid
          from ${schemaName}.country_user_summary cus
          where ${whereConditions.join(' and ')}
      ),
         counts as (
      select count(distinct (id)) as totals, coalesce(role ->> 'role', invitation ->> 'role') as role
      from filtered_users u
      left join ${schemaName}.country_user_summary using (uuid)
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
