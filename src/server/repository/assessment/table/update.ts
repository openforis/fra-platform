import { Assessment, Table, TableProps } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { TableAdapter } from 'server/repository/adapter'

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
