import { Assessment, Cycle, Row, RowProps, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { RowAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycles: Array<Cycle>
  table: Table
  rowProps: RowProps
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<Row> => {
  const { assessment, cycles, table } = props

  const colProps = { ...props.rowProps, cycles: cycles.map(({ uuid }) => uuid) }

  const schemaName = Schemas.getName(assessment)

  return client.one<Row>(
    `
        insert into ${schemaName}.row (props, table_id)
        values ($1::jsonb, $2)
        returning *`,
    [JSON.stringify(colProps), +table.id],
    RowAdapter
  )
}
