const camelize = require('camelize')
const db = require('../../../db/db')

const getForestCharacteristicsView = async (schemaName = 'public') => {
  const result = await db.query(`
      SELECT
          *
      FROM
          ${schemaName}.forest_characteristics_view fcv
      GROUP BY
          1,
          2,
          3,
          4,
          5,
          6
      ORDER BY
          fcv.country_iso ;
  `)
  return camelize(result.rows)
}

module.exports = {
  getForestCharacteristicsView,
}
