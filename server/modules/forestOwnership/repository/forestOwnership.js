const camelize = require('camelize')
const db = require('../../../db/db')

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
  getForestOwnership,
}
