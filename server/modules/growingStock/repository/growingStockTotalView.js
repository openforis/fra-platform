const camelize = require('camelize')
const db = require('../../../db/db')

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

module.exports = {
  getGrowingStockTotal,
}
