const camelize = require('camelize')
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

const getExportData = async (table, variable, countries, columns) => {
  // Add "" around year columns
  const columnsJoined = columns.map((x) => `"${x}"`).join(',')
  const countriesJoined = countries.map((x) => `'${x}'`).join(',')
  // check if table exists in views array
  const tableName = views.includes(table) ? `${table}_view` : table

  const query = `
    SELECT country_iso, row_name, ${columnsJoined}
    FROM ${tableName} t
    WHERE t.country_iso IN (${countriesJoined})
    AND t.row_name = $1
  `
  const result = await db.query(query, [variable])
  return camelize(result.rows)
}

module.exports = {
  getExportData,
}
