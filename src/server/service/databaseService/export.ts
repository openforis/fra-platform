import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'
import { EXPORT_TABLES } from 'server/service/databaseService/EXPORT_TABLES'

export type ExportTableProps = {
  schema: string
  table: string
  orderBy?: string
}

const exportTable = async (props: ExportTableProps, client: BaseProtocol = DB): Promise<ExportedTableData> => {
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

export const exportTables = async (client: BaseProtocol = DB): Promise<Array<ExportedTableData>> => {
  return Promise.all(EXPORT_TABLES.map((tableConfig) => exportTable(tableConfig, client)))
}
