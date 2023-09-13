import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one(
    `
        select count(c.country_iso) as total
        from ${schemaCycle}.country_summary c
    `,
    [],
    (res) => Objects.camelize(res)
  )
}
