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
const getExportData = async (schemaName, table, variable, countries, columns) => {
  // Add "" around year columns
  const columnsJoined = columns.map((x) => `'${x}', t."${x}"`).join(',')
  const countriesJoined = countries.map((x) => `'${x}'`).join(',')
  // check if table exists in views array
  const tableName = views.includes(table) ? `${table}_view` : table

  const query = `
    SELECT json_object_agg(t.country_iso, json_build_object(${columnsJoined}))
    FROM ${schemaName}.${tableName} t
    WHERE t.country_iso IN (${countriesJoined})
    AND t.row_name = $1
  `
  const result = await db.query(query, [variable])
  return result.rows[0].json_object_agg
}

module.exports = {
  getExportData,
}
