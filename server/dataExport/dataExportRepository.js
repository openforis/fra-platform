const camelize = require('camelize')
const db = require('../db/db')

const KEYS_TABLE = {
  extentOfForest: 'extent_of_forest_view',
  forestCharacteristics: 'forest_characteristics_view',
  forestAreaChange: '',
  annualReforestation: '',
  specificForestCategories: '',
  otherLandWithTreeCover: '',
  growingStock: '',
  growingStockComposition: 'growing_stock_total_view',
  biomassStock: '',
  carbonStock: 'carbon_stock_view',
  designatedManagementObjective: '',
  forestAreaWithinProtectedAreas: '',
  forestOwnership: '',
  holderOfManagementRights: '',
  disturbances: '',
  areaAffectedByFire: '',
  degradedForest: '',
  forestPolicy: '',
  areaOfPermanentForestEstate: '',
  employment: '',
  graduationOfStudents: '',
}

const getExportData = async (table, variable, countries, columns) => {
  // Add "" around year columns
  const columnsJoined = columns.map((x) => `"${x}"`).join(',')
  const countriesJoined = countries.map((x) => `'${x}'`).join(',')

  const query = `
    SELECT country_iso, row_name, ${columnsJoined}
    FROM ${KEYS_TABLE[table]} t
    WHERE t.country_iso IN (${countriesJoined})
    AND t.row_name = $1
  `
  const result = await db.query(query, [variable])
  return camelize(result.rows)
}

module.exports = {
  getExportData,
}
