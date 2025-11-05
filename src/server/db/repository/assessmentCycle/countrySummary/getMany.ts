import { Objects } from 'utils/objects'

import { CountrySummary } from 'meta/area/countrySummary'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db/db'
import { getBaseQuery } from 'server/db/repository/assessmentCycle/countrySummary/_queries/getBaseQuery'
import { CountrySummaryGetManyProps } from 'server/db/repository/assessmentCycle/countrySummary/countrySummaryGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/assessmentCycle/countrySummary/utils/getPropsToQueryParams'

const _getOrderClause = (
  orderBy: string | undefined,
  orderByDirection: TablePaginatedOrderByDirection | undefined
): string => {
  const direction = orderByDirection ?? TablePaginatedOrderByDirection.asc

  if (Objects.isEmpty(orderBy) || orderBy === 'country_name') return `order by cs.sort_index ${direction} nulls last`

  return `order by cs.${orderBy} ${direction} nulls last`
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
    select
     cs.country_iso,
     cs.status,
     cs.last_update,
     cs.last_edit,
     cs.last_edit_odp,
     cs.last_in_editing,
     cs.last_in_review,
     cs.last_in_approval,
     cs.last_in_accepted,
     cs.invitations_accepted_count,
     cs.invitations_sent_count,
     cs.users_count
    from country_summary cs
    ${!Objects.isEmpty(whereConditions) ? `where ${whereConditions.join(' and ')}` : ''}
    ${order}
    ${queryParams.limit ? `limit $(limit)` : ''}
    ${queryParams.offset ? `offset $(offset)` : ''}
    ;
  `

  return client.map(query, queryParams, (rows) => Objects.camelize(rows))
}
