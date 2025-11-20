import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'
import { EXPORT_TABLES } from 'server/service/databaseService/EXPORT_TABLES'

export type ExportTableProps = {
  schema: string
  table: string
  orderBy?: string
  where?: string
  skipExport?: boolean
}

const exportTable = async (props: ExportTableProps, client: BaseProtocol = DB): Promise<ExportedTableData> => {
  const { orderBy = 'id', schema, table, where = '1 = 1' } = props

  const rows = await client.manyOrNone(`select * from ${schema}.${table} where ${where} order by ${orderBy}`)

  return {
    schema,
    table,
    rows,
    exportedAt: new Date().toISOString(),
    rowCount: rows.length,
  }
}

export const exportTables = async (client: BaseProtocol = DB): Promise<Array<ExportedTableData>> => {
  const tables = EXPORT_TABLES.filter((t) => !t.skipExport)
  return Promise.all(tables.map((tableConfig) => exportTable(tableConfig, client)))
}
