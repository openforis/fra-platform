const camelize = require('camelize')
const db = require('../../../db/db')

const getGrowingStockTotal = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.GROWING_STOCK_TOTAL_VIEW GSTV
  ORDER BY
    country_iso ASC
  `)
  return camelize(result.rows)
}

module.exports = {
  getGrowingStockTotal,
}
