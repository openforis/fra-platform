// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// Some data is fetched from views
const views = [
  'extent_of_forest',
  'forest_characteristics',
  'forest_area_change',
  'growing_stock',
  'carbon_stock',
  'forest_ownership',
  'holder_of_management_rights',
  'disturbances',
  'primary_designated_management_objective',
]

// schemaName can be either:
// - the latest "frozen"/versioned schema
// - if previous not found then public
// - if assessmentType is panEuropean: pan_european
const getExportData = async (schemaName: any, table: any, variables: any, countries: any, columns: any) => {
  // Add "" around year columns
  const columnsJoined = columns.map((x: any) => `'${x}', t."${x}"`).join(',')
  const countriesJoined = countries.map((x: any) => `'${x}'`).join(',')
  // check if table exists in views array
  const tableName = views.includes(table) ? `${table}_view` : table

  const query = `
    SELECT t.country_iso, t.row_name, ${columnsJoined}
    FROM ${schemaName}.${tableName} t
    WHERE t.country_iso IN (${countriesJoined})
    AND t.row_name IN (SELECT value #>> '{}' from json_array_elements($1::json))
    ORDER BY t.country_iso, t.row_name;
  `

  const result = await db.query(query, [JSON.stringify(variables)])

  const res = {}
  result.rows.forEach((row: any) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!res[row.country_iso]) res[row.country_iso] = {}
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    res[row.country_iso][row.row_name] = Object.fromEntries(
      Object.entries(row).filter(([name]) => columns.includes(name))
    )
  })

  return res
}

module.exports = {
  getExportData,
}
