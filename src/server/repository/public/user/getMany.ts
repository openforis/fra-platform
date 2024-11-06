import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { RoleName, User, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

export type UsersGetManyProps = {
  assessment?: Assessment
  cycle?: Cycle
  countryIso?: CountryIso

  administrators?: boolean
  countries?: Array<CountryIso>
  fullName?: string
  invitedUsers?: boolean
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>

  limit?: number
  offset?: number

  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

type BuildQueryReturned = { query: string; queryParams: Record<string, string | number | boolean> }

const _getOrderClause = (
  orderBy: string | undefined,
  orderByDirection: TablePaginatedOrderByDirection | undefined
): string => {
  const orderByName = "order by concat(u.props->'name', ' ', u.props->'surname')"

  if (Objects.isEmpty(orderBy)) return `${orderByName} ${TablePaginatedOrderByDirection.asc}`

  const direction = orderByDirection ?? TablePaginatedOrderByDirection.asc
  if (orderBy === 'name') {
    return `${orderByName} ${direction}`
  }
  return `order by ${orderBy} ${direction}`
}

export const buildGetManyQuery = (props: UsersGetManyProps): BuildQueryReturned => {
  const {
    administrators, // include admins in the query
    assessment,
    countries,
    countryIso,
    cycle,
    fullName,
    invitedUsers,
    limit,
    offset,
    orderBy,
    orderByDirection,
    roles,
    statuses = [UserStatus.active, UserStatus.invitationPending],
  } = props

  const selectedCountries = !Objects.isEmpty(countries)
    ? countries.map((countryIso) => `'${countryIso}'`).join(',')
    : null

  const selectedRoles = !Objects.isEmpty(roles) ? roles.map((roleName) => `'${roleName}'`).join(',') : null

  const whereConditions: Array<string> = []

  if (administrators) {
    if (invitedUsers) {
      whereConditions.push(`
        (
          ((ur.assessment_uuid = $(assessmentUuid) and ur.cycle_uuid = $(cycleUuid))
              or (ur.role = '${RoleName.ADMINISTRATOR}'))
          or (ui.assessment_uuid = $(assessmentUuid) and ui.cycle_uuid = $(cycleUuid))
        )
      `)
    } else {
      whereConditions.push(`(
        (ur.assessment_uuid = $(assessmentUuid) and ur.cycle_uuid = $(cycleUuid))
        or (ur.role = '${RoleName.ADMINISTRATOR}')
      )`)
    }
  } else if (invitedUsers) {
    whereConditions.push(`(
      (ur.assessment_uuid = $(assessmentUuid) and ur.cycle_uuid = $(cycleUuid))
      or (ui.assessment_uuid = $(assessmentUuid) and ui.cycle_uuid = $(cycleUuid))
    )`)
  } else {
    whereConditions.push('ur.assessment_uuid = $(assessmentUuid)')
    whereConditions.push('ur.cycle_uuid = $(cycleUuid)')
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

  if (statuses) {
    whereConditions.push(`u.status in (${statuses.map((status) => `'${status}'`).join(',')})`)
  }

  if (countryIso) {
    whereConditions.push(`u.uuid in (
    select user_uuid
    from public.users_role
    where assessment_uuid = $(assessmentUuid)
      and cycle_uuid = $(cycleUuid)
      and country_iso = $(countryIso)
    )`)
  }

  const order = _getOrderClause(orderBy, orderByDirection)

  const rolesSelect = invitedUsers
    ? `jsonb_agg(
       case
           when ur.uuid is not null then to_jsonb(ur.*) - 'props'
           when ui.uuid is not null then jsonb_build_object(
                   'assessment_uuid', ui.assessment_uuid,
                   'cycle_uuid', ui.cycle_uuid,
                   'country_iso', ui.country_iso,
                   'user_uuid', ui.user_uuid,
                   'role', ui.role
                                         )
           else null
           end
                ) filter (where ur.uuid is not null or ui.uuid is not null) as roles`
    : `jsonb_agg(to_jsonb(ur.*) - 'props') as roles`

  const joinInvitedUsers = invitedUsers
    ? `left join public.users_invitation ui on (u.uuid = ui.user_uuid and u.status = 'invitationPending')`
    : ''

  const query = `
    select ${selectFields}, ${rolesSelect}
    from public.users u
      left join public.users_role ur on (u.uuid = ur.user_uuid)
      ${joinInvitedUsers}
    where ${whereConditions.join(`
      and `)}
    group by ${selectFields} ${invitedUsers ? ', ui.uuid' : ''}
    ${order}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
  `

  const queryParams = { assessmentUuid: assessment.uuid, cycleUuid: cycle.uuid, countryIso }

  return { query, queryParams }
}

export const getMany = async (props: UsersGetManyProps, client: BaseProtocol = DB): Promise<Array<User>> => {
  const { query, queryParams } = buildGetManyQuery(props)

  return client.manyOrNone<User>(query, queryParams).then((data) =>
    data.map(({ roles, ...user }) => ({
      ...Objects.camelize(user),
      roles: roles.map(UserRoleAdapter),
    }))
  )
}
