const camelize = require('camelize')
const db = require('../../../db/db')

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

module.exports = {
  getForestAreaWithinProtectedAreas,
}
