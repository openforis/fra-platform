import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { RoleName, User, UserStatus } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { UserQueryParams } from './UserQueryParams'

export type UsersGetManyProps = {
  assessment?: Assessment
  cycle?: Cycle
  countryIso?: CountryIso

  administrators?: boolean
  countries?: Array<CountryIso>
  fullName?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>

  limit?: number
  offset?: number

  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

type BuildQueryReturned = { query: string; queryParams: UserQueryParams }

const _getOrderClause = (
  orderBy: string | undefined = 'full_name',
  orderByDirection: TablePaginatedOrderByDirection | undefined = TablePaginatedOrderByDirection.asc
): string => {
  return `order by ${orderBy} ${orderByDirection}`
}

export const buildGetManyQuery = (props: UsersGetManyProps): BuildQueryReturned => {
  const {
    countryIso,
    assessment,
    cycle,
    limit,
    offset,
    countries,
    fullName,
    roles,
    administrators,
    statuses = [UserStatus.active, UserStatus.invitationPending],
    orderBy,
    orderByDirection,
  } = props

  const queryParams: UserQueryParams = {}

  if (fullName) queryParams.fullName = fullName.trim().toLowerCase()
  if (countryIso) queryParams.countryIso = countryIso

  const selectedCountries = !Objects.isEmpty(countries)
    ? countries.map((countryIso) => `'${countryIso}'`).join(',')
    : null

  const allRoles = administrators
    ? Object.values(RoleName)
    : Object.values(RoleName).filter((role) => role !== RoleName.ADMINISTRATOR)

  const selectedRoles = !Objects.isEmpty(roles) ? roles : allRoles
  if (selectedRoles) queryParams.roles = selectedRoles

  const userStatuses = statuses || undefined
  if (userStatuses) queryParams.statuses = userStatuses

  if (limit) queryParams.limit = limit
  if (offset) queryParams.offset = offset

  const order = _getOrderClause(orderBy, orderByDirection)

  const whereConditions = [
    fullName && `full_name ilike '%' || $(fullName) || '%'`,
    selectedRoles &&
      `(
      (role is not null and role ->> 'role' in ($(roles:list)))
      or 
      (invitation is not null and invitation ->> 'role' in ($(roles:list)))
    )`,
    countryIso && `country_iso = $(countryIso)`,
    selectedCountries && `country_iso in ($(selectedCountries))`,
    userStatuses && `status in ($(statuses:list))`,
  ].filter(Boolean)

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const query = `
  with filtered_users as (
    select distinct id
    from ${schemaName}.country_user_summary cus
    where ${whereConditions.join(' and ')}
  )
  select 
      cus.id,
      cus.full_name,
      cus.email,
      coalesce(jsonb_agg(cus.role) filter ( where cus.role is not null ), '[]') as roles,
      coalesce(jsonb_agg(cus.invitation) filter ( where cus.invitation is not null ), '[]') as invitations
    from filtered_users fu
    left join ${schemaName}.country_user_summary cus on fu.id = cus.id
    group by cus.id, cus.full_name, cus.email
    ${order}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
  `
  return { query, queryParams }
}

export const getMany = async (props: UsersGetManyProps, client: BaseProtocol = DB): Promise<Array<User>> => {
  const { query, queryParams } = buildGetManyQuery(props)

  return client.map<User>(query, queryParams, (row) => Objects.camelize(row))
}
