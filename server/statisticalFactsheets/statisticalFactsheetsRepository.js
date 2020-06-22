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

const getForestArea = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND row_name = 'forest_area'
  `)

  return camelize(result.rows)
}

const getForestAreaPercent = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND row_name = 'forest_area_percent'
        
  `)

  return camelize(result.rows)
}

const getPrimaryForest = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND( row_name = 'forest_area'
       OR row_name = 'primary_forest'
       ) 
  `)

  return camelize(result.rows)
}

const getForestOwnership = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND( row_name = 'private_ownership'
       OR row_name = 'public_ownership'
       OR row_name = 'other_or_unknown'
       ) 
  `)

  return camelize(result.rows)
}

const getForestAreaWithinProtectedAreas = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND row_name = 'forest_area_within_protected_areas' 
  `)

  return camelize(result.rows)
}

const getNaturallyRegenerating = async (schemaName, level) => {
  const result = await db.query(`
    SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND( row_name = 'natural_forest_area'
       OR row_name = 'planted_forest'
       ) 
  `)

  return camelize(result.rows)
}

module.exports = {
  getStatisticalFactsheetTableAgg,
  getCarbonAndGrowingStock,
  getPrimaryDesignatedManagementObjective,
  getForestArea,
  getForestAreaPercent,
  getPrimaryForest,
  getForestOwnership,
  getForestAreaWithinProtectedAreas,
  getNaturallyRegenerating,
}
