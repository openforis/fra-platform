import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  excludeDeleted?: boolean
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, cycle, excludeDeleted = true } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let where = ''
  if (excludeDeleted) {
    where = "where (props->>'deleted')::boolean is distinct from true"
  }

  return client.one(
    `
        select count(l.id) as total
        from ${schemaCycle}.link l
        ${where}
    `,
    [],
    (res) => Objects.camelize(res)
  )
}
