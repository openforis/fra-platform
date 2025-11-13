import { BaseProtocol, DB } from 'server/db/db'

import { ExportedTableData, ExportTableProps } from './types'

// Returns all columns from given table, sorted by id
export const _exportTable = async (props: ExportTableProps, client: BaseProtocol = DB): Promise<ExportedTableData> => {
  const { orderBy = 'id', schema, table } = props

  const rows = await client.manyOrNone(`select * from ${schema}.${table} order by ${orderBy}`)

  return {
    schema,
    table,
    rows,
    exportedAt: new Date().toISOString(),
    rowCount: rows.length,
  }
}
