const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT *
  FROM ${schemaName}.statistical_factsheets_view
  `)

  return camelize(result.rows)
}

module.exports = {
  getStatisticalFactsheetTableAgg,
}
