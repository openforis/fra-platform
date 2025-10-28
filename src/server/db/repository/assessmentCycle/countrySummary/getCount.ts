import { Objects } from 'utils/objects'

import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db/db'
import { getBaseQuery } from 'server/db/repository/assessmentCycle/countrySummary/_queries/getBaseQuery'
import { CountrySummaryGetManyProps } from 'server/db/repository/assessmentCycle/countrySummary/countrySummaryGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/assessmentCycle/countrySummary/utils/getPropsToQueryParams'

export const getCount = async (
  props: CountrySummaryGetManyProps,
  client: BaseProtocol = DB
): Promise<TablePaginatedCount> => {
  const { assessment, cycle } = props

  const baseQuery = getBaseQuery({ assessment, cycle })

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  return client.one(
    `
      ${baseQuery}
      select count(cs.country_iso) as total
      from country_summary cs
      ${!Objects.isEmpty(whereConditions) ? `where ${whereConditions.join(' and ')}` : ''}
    `,
    queryParams,
    (res) => Objects.camelize(res)
  )
}
