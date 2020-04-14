const camelize = require('camelize')
const db = require('../../../db/db')

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

module.exports = {
  getCarbonStock,
}
