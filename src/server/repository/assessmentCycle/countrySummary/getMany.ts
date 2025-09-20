import { Objects } from 'utils/objects'

import { CountrySummary } from 'meta/area'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'
import { CountrySummaryGetManyProps } from 'server/repository/assessmentCycle/countrySummary/countrySummaryGetManyProps'
import { getPropsToQueryParams } from 'server/repository/assessmentCycle/countrySummary/utils/getPropsToQueryParams'

import { getBaseQuery } from './_queries/getBaseQuery'

const _getOrderClause = (
  orderBy: string | undefined,
  orderByDirection: TablePaginatedOrderByDirection | undefined
): string => {
  const direction = orderByDirection ?? TablePaginatedOrderByDirection.asc
  if (Objects.isEmpty(orderBy)) return `order by country_iso ${direction} nulls last`
  return `order by ${orderBy} ${direction} nulls last`
}

export const getMany = async (
  props: CountrySummaryGetManyProps,
  client: BaseProtocol = DB
): Promise<Array<CountrySummary>> => {
  const { assessment, cycle, orderBy, orderByDirection } = props

  const baseQuery = getBaseQuery({ assessment, cycle })
  const order = _getOrderClause(orderBy, orderByDirection)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const query = `
    ${baseQuery}
    select *
    from country_summary
    ${!Objects.isEmpty(whereConditions) ? `where ${whereConditions.join(' and ')}` : ''}
    ${order}
    ${queryParams.limit ? `limit $(limit)` : ''}
    ${queryParams.offset ? `offset $(offset)` : ''}
    ;
  `

  return client.map(query, queryParams, (rows) => Objects.camelize(rows))
}
