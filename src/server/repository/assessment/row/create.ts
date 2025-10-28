import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Row, RowProps } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { RowAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycles: Array<Cycle>
  table: Table
  rowProps: RowProps
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<Row> => {
  const { assessment, cycles, table } = props

  const rolProps = { ...props.rowProps, cycles: cycles.map(({ uuid }) => uuid) }

  const schemaName = Schemas.getName(assessment)

  return client.one<Row>(
    `
        insert into ${schemaName}.row (props, table_id)
        values ($1::jsonb, $2)
        returning *`,
    [JSON.stringify(rolProps), +table.id],
    RowAdapter
  )
}
