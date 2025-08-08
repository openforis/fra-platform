import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, cycle } = props

  const baseQuery = getBaseQuery({ assessment, cycle })

  return client.one(
    `
      ${baseQuery}
      select count(cs.country_iso) as total
      from country_summary cs
    `,
    [],
    (res) => Objects.camelize(res)
  )
}
