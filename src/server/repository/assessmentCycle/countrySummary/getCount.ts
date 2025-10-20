import { Objects } from 'utils/objects'

import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'
import { CountrySummaryGetManyProps } from 'server/repository/assessmentCycle/countrySummary/countrySummaryGetManyProps'
import { getPropsToQueryParams } from 'server/repository/assessmentCycle/countrySummary/utils/getPropsToQueryParams'

import { getBaseQuery } from './_queries/getBaseQuery'

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
