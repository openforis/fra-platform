const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT *
  FROM ${schemaName}.statistical_factsheets_view
  -- All the rows/variables used in statistical factsheet 
  WHERE row_name = 'Carbon stock in biomass (Gt)'
    OR row_name = 'Conservation (1000 ha)'
    OR row_name = 'Forest area (1000 ha)'
    OR row_name = 'Forest area (% of land area)'
    OR row_name = 'Forest in protected areas (1000 ha)'
    OR row_name = 'Growing stock (million m3)'
    OR row_name = 'Multiple use (1000 ha)'
    OR row_name = 'Naturally regenerating forest (1000 ha)'
    OR row_name = 'Other (1000 ha)'
    OR row_name = 'Other/unknown ownership (1000 ha)'
    OR row_name = 'Planted forest (1000 ha)'
    OR row_name = 'Planted forest of which plantation forest (1000 ha)'
    OR row_name = 'Primary forest (1000 ha)'
    OR row_name = 'Private ownership (1000 ha)'
    OR row_name = 'Production (1000 ha)'
    OR row_name = 'Protection of soil and water (1000 ha)'
    OR row_name = 'Public ownership (1000 ha)'
    OR row_name = 'Social services (1000 ha)'
    OR row_name = 'Total carbon stock (Gt)';
  `)

  return camelize([...result.rows])
}

module.exports = {
  getStatisticalFactsheetTableAgg,
}
