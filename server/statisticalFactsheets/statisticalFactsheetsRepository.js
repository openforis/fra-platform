const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT *
  FROM ${schemaName}.statistical_factsheets_view
  `)

  return camelize(result.rows)
}

const getStatisticalFactsheetData = async (schemaName, level, rowNames) => {
  const rowNamesJoined = rowNames.map((rowName) => `'${rowName}'`).join(', ')
  const result = await db.query(`
   SELECT *
    FROM ${schemaName}.statistical_factsheets_view
    WHERE level   = '${level}'
    AND row_name IN (${rowNamesJoined})
    `)

  return camelize(result.rows)
}

const getStatisticalFactsheetLevelISOs = async (schemaName) => {
  const result = await db.query(
    `select distinct level from ${schemaName}.statistical_factsheets_view where level not ilike 'atlantis%' order by level`
  )

  return result.rows.map((row) => row.level)
}

module.exports = {
  getStatisticalFactsheetTableAgg,
  getStatisticalFactsheetLevelISOs,
  getStatisticalFactsheetData,
}
