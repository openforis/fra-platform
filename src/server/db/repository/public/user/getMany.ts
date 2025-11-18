import { Objects } from 'utils/objects'

import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserQueryParams } from 'server/db/repository/public/user/UserQueryParams'
import { UsersGetManyProps } from 'server/db/repository/public/user/usersGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/public/user/utils/getPropsToQueryParams'
import { Schemas } from 'server/db/schemas'

type BuildQueryReturned = { query: string; queryParams: UserQueryParams }

const _getOrderClause = (
  orderBy: string | undefined = 'full_name',
  orderByDirection: TablePaginatedOrderByDirection = TablePaginatedOrderByDirection.asc
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
  select 
      cus.id,
      cus.uuid,
      cus.full_name,
      cus.email,
      cus.lang,
      coalesce(jsonb_agg(cus.role) filter ( where cus.role is not null ), '[]') as roles,
      coalesce(jsonb_agg(cus.invitation) filter ( where cus.invitation is not null ), '[]') as invitations
    from ${schemaName}.country_user_summary cus
    where ${whereConditions.join(' and ')}
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
