import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const count = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countries?: Array<CountryIso>
    fullName?: string
    roles?: Array<RoleName>
  },
  client: BaseProtocol = DB
): Promise<{ totals: number }> => {
  const { assessment, cycle, countries, fullName, roles } = props

  // const selectedCountries = countries.map((countryIso) => `'${countryIso}'`).join(',')
  // const selectedRoles = roles.map((roleName) => `'${roleName}'`).join(',')
  const conditions: Array<string> = []
  if (!Objects.isEmpty(countries))
    conditions.push(`ur.country_iso in (${countries.map((countryIso) => `'${countryIso}'`).join(',')})`)

  if (!Objects.isEmpty(roles)) conditions.push(`ur.role in (${roles.map((roleName) => `'${roleName}'`).join(',')})`)

  if (!Objects.isEmpty(fullName))
    conditions.push(`and concat(u.props->'name', ' ', u.props->'surname') ilike '%${fullName}%'`)

  const getQuery = (groupByRole?: boolean): string => {
    return `select count(distinct (u.id)) as totals
                ${groupByRole ? `, ur.role` : ''}
            from public.users u
                     join public.users_role ur on u.id = ur.user_id
            where (ur.assessment_id is null or (ur.assessment_id = $1 and ur.cycle_uuid = $2))
              and ((ur.accepted_at is not null and ur.invited_at is not null) or ur.invited_at is null)
                ${conditions.join(` 
              and 
              `)} ${groupByRole ? `group by ur.role` : ''}`
  }

  const queryTotals = getQuery()
  const queryRoles = `with counts as (${getQuery(true)})
                      select jsonb_object_agg(counts.role, counts.totals) as result
                      from counts`

  const totals = await client.one<number>(queryTotals, [assessment.id, cycle.uuid], ({ totals }) => totals)
  const roleTotals = await client.one<Record<RoleName, number>>(
    queryRoles,
    [assessment.id, cycle.uuid],
    ({ result }) => result
  )

  return { totals, ...roleTotals }
}
