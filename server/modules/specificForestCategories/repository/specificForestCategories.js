const camelize = require('camelize')
const db = require('../../../db/db')

const getSpecificForestCategories = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
	  *
  FROM
    ${schemaName}.SPECIFIC_FOREST_CATEGORIES SFC
  WHERE
    SFC.ROW_NAME = 'primary_forest'
  GROUP BY SFC.COUNTRY_ISO , SFC.ROW_NAME ;
  `)
  return camelize(result.rows)
}

module.exports = {
  getSpecificForestCategories,
}
