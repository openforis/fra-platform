import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'

const importTable = async (exportedTableData: ExportedTableData, client: BaseProtocol = DB): Promise<void> => {
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

export const importTables = async (allData: Array<ExportedTableData>, client: BaseProtocol = DB): Promise<void> => {
  await Promises.each(allData, async (exportedTableData) => {
    await importTable(exportedTableData, client)
  })
}
