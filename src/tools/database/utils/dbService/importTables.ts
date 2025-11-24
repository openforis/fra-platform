import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { BaseProtocol, DB } from 'server/db/db'

import { ExportedTableData } from './exportTables'

type ImportTableProps = { exportedTableData: ExportedTableData }
const importTable = async (props: ImportTableProps, client: BaseProtocol = DB): Promise<void> => {
  const { exportedTableData } = props
  const { rows, schema, table } = exportedTableData

  if (rows.length === 0) {
    return
  }

  // Get column names from the first row and omit id
  const columnNames = Object.keys(rows[0]).filter((column: string) => column !== 'id')

  const pgp = pgPromise()
  const firstRow = rows[0] as Record<string, unknown>
  const columns = columnNames.map((colName) => {
    const firstValue = firstRow[colName]

    // Properly handle JSONB columns
    if (typeof firstValue === 'object' && firstValue !== null) {
      return { name: colName, mod: ':json', cast: 'jsonb' }
    }
    return colName
  })

  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } })
  const query = pgp.helpers.insert(rows, cs)

  await client.none(query)
}

type Props = {
  tables: Array<ExportedTableData>
}

export const importTables = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { tables } = props
  await Promises.each(tables, async (exportedTableData) => {
    await importTable({ exportedTableData }, client)
  })
}
