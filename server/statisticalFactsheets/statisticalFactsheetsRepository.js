const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.statistical_factisheets_table_agg
  ORDER BY
    level ASC
  `)
  return camelize(result.rows)
}

module.exports = {
  getStatisticalFactsheetTableAgg,
}
