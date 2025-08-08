import { Objects } from 'utils/objects'

import { CountrySummary } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
  limit?: string
  offset?: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountrySummary>> => {
  const { assessment, cycle, limit, offset, orderBy, orderByDirection } = props

  const baseQuery = getBaseQuery({ assessment, cycle })

  const query = `
    ${baseQuery}
    select *
    from country_summary
    order by ${orderBy ?? 'country_iso'} ${orderByDirection ?? TablePaginatedOrderByDirection.asc} nulls last
    ${limit ? 'limit $1' : ''} ${offset ? 'offset $2' : ''}
    ;
  `

  const params = []
  if (limit) params.push(limit)
  if (offset) params.push(offset)

  return client.map(query, params, (rows) => Objects.camelize(rows))
}
