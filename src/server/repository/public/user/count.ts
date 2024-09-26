import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

import { buildGetManyQuery } from './getMany'

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
  const { administrators, assessment, countries, cycle, fullName, roles, statuses } = props

  const conditions: Array<string> = []
  if (Objects.isEmpty(countries)) conditions.push(`(ur.country_iso is null or ur.country_iso not like 'X%')`)
  else conditions.push(`ur.country_iso in (${countries.map((countryIso) => `'${countryIso}'`).join(',')})`)

  if (!Objects.isEmpty(roles)) conditions.push(`ur.role in (${roles.map((roleName) => `'${roleName}'`).join(',')})`)

  if (!Objects.isEmpty(fullName))
    conditions.push(`concat(u.props->'name', ' ', u.props->'surname') ilike '%${fullName}%'`)

  const getQuery = (groupByRole?: boolean): string => {
    return `select count(distinct (u.id)) as totals
                ${groupByRole ? `, ur.role` : ''}
            from public.users u
                     join public.users_role ur on u.id = ur.user_id
            where (ur.assessment_id is null or (ur.assessment_id = $1 and ur.cycle_uuid = $2))
              -- and ((ur.accepted_at is not null and ur.invited_at is not null) or ur.invited_at is null)
                and ${conditions.join(` 
              and 
              `)} ${groupByRole ? `group by ur.role` : ''}`
  }

  const queryRoles = `with counts as (${getQuery(true)})
  select jsonb_object_agg(counts.role, counts.totals) as result
  from counts`

  const { query: subQueryTotals, queryParams: queryTotalsParams } = buildGetManyQuery({
    administrators,
    assessment,
    countries,
    cycle,
    fullName,
    roles,
    statuses,
  })

  const queryTotals = `
  select count(*) as total
  from (
      ${subQueryTotals}
  ) as users;
  `

  const total = await client.one<number>(queryTotals, queryTotalsParams, ({ total }) => total)
  const roleTotals = await client.one<Record<RoleName, number>>(
    queryRoles,
    [assessment.id, cycle.uuid],
    ({ result }) => result
  )

  return { total, ...roleTotals }
}
