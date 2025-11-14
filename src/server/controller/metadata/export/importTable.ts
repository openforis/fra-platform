import * as pgPromise from 'pg-promise'

import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'

export const importTable = async (data: ExportedTableData, client: BaseProtocol = DB): Promise<void> => {
  const { rows, schema, table } = data

  if (rows.length === 0) {
    return
  }

  // Get column names from the first row and omit id
  const columns = Object.keys(rows[0]).filter((column: string) => column !== 'id')

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } })
  const query = pgp.helpers.insert(rows, cs)

  await client.none(query)
}
