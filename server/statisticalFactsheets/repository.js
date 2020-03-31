const camelize = require('camelize')
const db = require('../db/db')

const getGrowingStockTotal = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    DISTINCT ON
    (country_iso) country_iso,
    id,
    row_name,
    "1990",
    "2000",
    "2010",
    "2015",
    "2020"
  FROM
    ${schemaName}.GROWING_STOCK_TOTAL_VIEW GSTV
  ORDER BY
    country_iso,
    id ASC;
  `)
  return camelize(result.rows)
}

const getCarbonStock = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.CARBON_STOCK CS 
  GROUP BY CS.COUNTRY_ISO , CS.ROW_NAME ;

  `)
  return camelize(result.rows)
}

const getSpecificForestCategories = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
	  *
  FROM
    ${schemaName}.SPECIFIC_FOREST_CATEGORIES SFC
  WHERE
    SFC.ROW_NAME = 'primary_forest'
  GROUP BY SFC.COUNTRY_ISO , SFC.ROW_NAME ;
  `)
  return camelize(result.rows)
}

const getForestAreaWithinProtectedAreas = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.FOREST_AREA_WITHIN_PROTECTED_AREAS FAWPA
  WHERE
    FAWPA.ROW_NAME = 'forest_area_within_protected_areas'
  GROUP BY
    FAWPA.COUNTRY_ISO,
    FAWPA.ROW_NAME ;
  `)
  return camelize(result.rows)
}

const getPrimaryDesignatedManagementObjective = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.PRIMARY_DESIGNATED_MANAGEMENT_OBJECTIVE PDMO
  WHERE
    PDMO.ROW_NAME = 'production'
    OR PDMO.ROW_NAME = 'protection_of_soil_and_water'
    OR PDMO.ROW_NAME = 'conservation_of_biodiversity'
    OR PDMO.ROW_NAME = 'social_services'
    OR PDMO.ROW_NAME = 'multiple_use'
    OR PDMO.ROW_NAME = 'other'
  GROUP BY
    PDMO.COUNTRY_ISO,
    PDMO.ROW_NAME ;
  `)
  return camelize(result.rows)
}

const getForestOwnership = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.FOREST_OWNERSHIP FO
  WHERE
    FO.ROW_NAME = 'private_ownership'
    OR FO.ROW_NAME = 'public_ownership'
    OR FO.ROW_NAME = 'other_or_unknown'
  GROUP BY
    FO.row_name, FO.COUNTRY_ISO 
    
  `)
  return camelize(result.rows)
}

module.exports = {
  getGrowingStockTotal,
  getCarbonStock,
  getSpecificForestCategories,
  getForestAreaWithinProtectedAreas,
  getPrimaryDesignatedManagementObjective,
  getForestOwnership,
}
