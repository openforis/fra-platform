import { Assessment } from 'meta/assessment/assessment'
import { Table, TableProps } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { TableAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  tableId: number
  tableProps: Partial<TableProps>
}

export const update = async (params: Props, client: BaseProtocol = DB): Promise<Table> => {
  const { assessment, tableId, tableProps } = params

  const schemaName = Schemas.getName(assessment)

  return client.one<Table>(
    `
            update ${schemaName}.table
            set props = props || $1::jsonb
            where id = $2 
            returning *;`,
    [JSON.stringify(tableProps), +tableId],
    TableAdapter
  )
}
