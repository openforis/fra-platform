import { Objects } from 'utils/objects'

import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { UsersGetManyProps } from 'server/repository/public/user/usersGetManyProps'
import { getPropsToQueryParams } from 'server/repository/public/user/utils/getPropsToQueryParams'

import { UserQueryParams } from './UserQueryParams'

type BuildQueryReturned = { query: string; queryParams: UserQueryParams }

const _getOrderClause = (
  orderBy: string | undefined = 'full_name',
  orderByDirection: TablePaginatedOrderByDirection | undefined = TablePaginatedOrderByDirection.asc
): string => {
  return `order by
    ${orderBy} ${orderByDirection}`
}

export const buildGetManyQuery = (props: UsersGetManyProps): BuildQueryReturned => {
  const { assessment, cycle, orderBy, orderByDirection } = props

  const order = _getOrderClause(orderBy, orderByDirection)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const query = `
  with filtered_users as (
    select distinct id
    from ${schemaName}.country_user_summary cus
    where ${whereConditions.join(' and ')}
  )
  select 
      cus.id,
      cus.uuid,
      cus.full_name,
      cus.email,
      cus.lang,
      coalesce(jsonb_agg(cus.role) filter ( where cus.role is not null ), '[]') as roles,
      coalesce(jsonb_agg(cus.invitation) filter ( where cus.invitation is not null ), '[]') as invitations
    from filtered_users fu
    left join ${schemaName}.country_user_summary cus on fu.id = cus.id
    group by cus.id, cus.uuid, cus.full_name, cus.email, cus.lang
    ${order}
    ${queryParams.limit ? `limit $(limit)` : ''}
    ${queryParams.offset ? `offset $(offset)` : ''}
  `
  return { query, queryParams }
}

export const getMany = async (props: UsersGetManyProps, client: BaseProtocol = DB): Promise<Array<User>> => {
  const { query, queryParams } = buildGetManyQuery(props)

  return client.map<User>(query, queryParams, (row) => Objects.camelize(row))
}
