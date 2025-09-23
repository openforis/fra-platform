import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedCount } from 'meta/tablePaginated'
import { CountriesFilters } from 'meta/tablePaginated/countries'

import { BaseProtocol, DB } from 'server/db'
import { getPropsToQueryParams } from 'server/repository/assessmentCycle/countrySummary/utils/getPropsToQueryParams'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
  filters?: CountriesFilters
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
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
