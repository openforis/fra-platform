const camelize = require('camelize')
const db = require('../../../db/db')

const getExtentOfForestView = async (schemaName = 'public') => {
  const result = await db.query(`
  SELECT
    *
  FROM
    ${schemaName}.extent_of_forest_view eofv
  GROUP BY
    1,2,3,4
  ORDER BY
    eofv.country_iso;
  `)

  return camelize(result.rows)
}

module.exports = {
  getExtentOfForestView,
}
