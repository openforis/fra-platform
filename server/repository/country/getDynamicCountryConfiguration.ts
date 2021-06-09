import * as db from '@server/db/db'

export const getDynamicCountryConfiguration = async (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.dynamic_country_configuration`
  const result = await db.pool.query(
    `
              SELECT config
              FROM ${tableName}
              WHERE country_iso = $1
    `,
    [countryIso]
  )
  if (result.rows.length === 0) return {}
  return result.rows[0].config
}
