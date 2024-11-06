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
  invitedUsers?: boolean
}

type Returned = {
  total: number
} & Record<RoleName, number>
export const count = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countries, cycle, fullName, roles, invitedUsers } = props

  const conditions: Array<string> = []
  if (Objects.isEmpty(countries)) conditions.push(`(ur.country_iso is null or ur.country_iso not like 'X%')`)
  else conditions.push(`ur.country_iso in (${countries.map((countryIso) => `'${countryIso}'`).join(',')})`)

  if (!Objects.isEmpty(roles)) conditions.push(`ur.role in (${roles.map((roleName) => `'${roleName}'`).join(',')})`)

  if (!Objects.isEmpty(fullName))
    conditions.push(`concat(u.props->'name', ' ', u.props->'surname') ilike '%${fullName}%'`)

  const roleSelectClause = invitedUsers ? `, coalesce(ur.role, ui.role) as role` : 'ui.role'
  const invitationJoinClause = invitedUsers ? 'left join public.users_invitation ui on u.uuid = ui.user_uuid' : ''
  const invitationWhereClause = invitedUsers
    ? 'or (ui.assessment_uuid = $(assessmentUuid) and ui.cycle_uuid = $(cycleUuid)))'
    : ''
  const invitationRoleClause = ' or ui.role is not null'
  const invitationGroupByClause = invitedUsers ? ', ui.role' : ''

  const getQuery = (groupByRole?: boolean): string => {
    return `select count(distinct (u.uuid)) as totals
                ${groupByRole ? `${roleSelectClause}` : ''}
            from public.users u
                     left join public.users_role ur on u.uuid = ur.user_uuid
                     ${invitationJoinClause}
            where 
                ((
                    ur.assessment_uuid is null or (ur.assessment_uuid = $(assessmentUuid) and ur.cycle_uuid = $(cycleUuid))
                    ${invitationWhereClause}
                ) 
              and (ur.role is not null ${invitationRoleClause})
              and ${conditions.join(` 
              and 
              `)} ${groupByRole ? `group by ur.role${invitationGroupByClause}` : ''}`
  }

  const queryRoles = `with counts as (${getQuery(true)})
  select jsonb_object_agg(counts.role, counts.totals) as result
  from counts`

  const { query: subQueryTotals, queryParams: queryTotalsParams } = buildGetManyQuery(props)

  const queryTotals = `
  select count(*) as total
  from (
      ${subQueryTotals}
  ) as users;
  `

  const total = await client.one<number>(queryTotals, queryTotalsParams, ({ total }) => total)
  const values = { assessmentUuid: assessment.uuid, cycleUuid: cycle.uuid }
  const roleTotals = await client.one<Record<RoleName, number>>(queryRoles, values, ({ result }) => result)

  return { total, ...roleTotals }
}
