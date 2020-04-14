const camelize = require('camelize')
const db = require('../../../db/db')

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

module.exports = {
  getPrimaryDesignatedManagementObjective,
}
