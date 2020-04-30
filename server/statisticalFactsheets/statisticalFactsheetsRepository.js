const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName = 'public') => {
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
