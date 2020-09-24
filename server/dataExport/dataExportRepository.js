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
]

// schemaName can be either:
// - the latest "frozen"/versioned schema
// - if previous not found then public
// - if assessmentType is panEuropean: pan_european
const getExportData = async (schemaName, table, variables, countries, columns) => {
  // Add "" around year columns
  const columnsJoined = columns.map((x) => `'${x}', t."${x}"`).join(',')
  const countriesJoined = countries.map((x) => `'${x}'`).join(',')
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
  result.rows.forEach((row) => {
    if (!res[row.country_iso]) res[row.country_iso] = {}
    res[row.country_iso][row.row_name] = Object.fromEntries(
      Object.entries(row).filter(([name]) => columns.includes(name))
    )
  })

  return res
}

module.exports = {
  getExportData,
}
