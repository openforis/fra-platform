const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT *
  FROM ${schemaName}.statistical_factsheets_view
  `)

  return camelize(result.rows)
}

const getCarbonAndGrowingStock = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND( row_name = 'carbon_stock_biomass_total'
       OR row_name = 'carbon_stock_total'
       OR row_name = 'growing_stock_total'
       ) 
  `)

  return camelize(result.rows)
}

const getPrimaryDesignatedManagementObjective = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND( row_name = 'production'
       OR row_name = 'multiple_use'
       OR row_name = 'conservation'
       OR row_name = 'other'
       OR row_name = 'protection_of_soil_and_water'
       OR row_name = 'social_services'
       ) 
  `)

  return camelize(result.rows)
}

module.exports = {
  getStatisticalFactsheetTableAgg,
  getCarbonAndGrowingStock,
  getPrimaryDesignatedManagementObjective,
}
