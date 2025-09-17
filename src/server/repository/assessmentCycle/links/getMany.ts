import { Objects } from 'utils/objects'

import { Link } from 'meta/cycleData'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { LinksGetManyProps } from 'server/repository/assessmentCycle/links/linksGetManyProps'
import { getPropsToQueryParams } from 'server/repository/assessmentCycle/links/utils/getPropsToQueryParams'

const _getOrderClause = (
  orderBy: string | undefined,
  orderByDirection: TablePaginatedOrderByDirection | undefined
): string => {
  if (Objects.isEmpty(orderBy)) return 'order by id asc'

  const direction = orderByDirection ?? TablePaginatedOrderByDirection.asc
  if (orderBy === 'code') {
    return `order by (visits -> jsonb_array_length(visits) - 1 ->> 'code') ${direction}, id asc`
  }
  return `order by ${orderBy} ${direction}`
}

export const getMany = (props: LinksGetManyProps, client: BaseProtocol = DB): Promise<Array<Link>> => {
  const { assessment, cycle, orderBy, orderByDirection } = props

  const order = _getOrderClause(orderBy, orderByDirection)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<Link>(
    `
        select *
        from ${schemaCycle}.link
        where ${whereConditions.join(' and ')}
        ${order}
        ${queryParams.limit ? `limit $(limit)` : ''}
        ${queryParams.offset ? `offset $(offset)` : ''}
     `,
    queryParams,
    (row) => Objects.camelize(row)
  )
}
