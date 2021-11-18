import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'
import { CountryIso } from '@core/country'
import { BaseProtocol, DB } from '@server/db'

export const read = async (
  params: { countryIso: CountryIso; tableSpecName: string; schemaName: string },
  client: BaseProtocol = DB
) => {
  const { countryIso, tableSpecName, schemaName = 'public' } = params

  const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableSpecName, schemaName)
  const result = await client.query(selectQuery, selectParams)
  if (result.len === 0) return []
  return result
}
