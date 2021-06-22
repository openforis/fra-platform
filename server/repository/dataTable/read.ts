import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'
import * as db from '@server/db/db_deprecated'

export const read = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableSpecName, schemaName) as any[]
  const result = await db.pool.query(selectQuery, selectParams)
  if (result.rowCount === 0) return []
  return result.rows
}
