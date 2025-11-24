import { BaseProtocol, DB } from 'server/db/db'

export type ExportedTableData<ROW = unknown> = {
  schema: string
  table: string
  rows: Array<ROW>
  exportedAt: string
  rowCount: number
}

export type ExportTableProps = {
  schema: string
  table: string
  orderBy?: string
  where?: string
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

type ExportTablesProps = {
  tables: Array<ExportTableProps>
}

export const exportTables = async (
  props: ExportTablesProps,
  client: BaseProtocol = DB
): Promise<Array<ExportedTableData>> => {
  const { tables } = props
  return Promise.all(tables.map((tableConfig) => exportTable(tableConfig, client)))
}
