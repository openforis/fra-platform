const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

module.exports.readGrowingStock = countryIso =>
  db
    .query(`
      SELECT
          year,
          naturally_regenerating_forest,
          naturally_regenerating_forest_avg,
          plantation_forest,
          plantation_forest_avg,
          other_planted_forest,
          other_planted_forest_avg,
          other_wooded_land,
          other_wooded_land_avg
      FROM
          growing_stock
      WHERE
              country_iso = $1` , [countryIso])
    .then(result => camelize(result.rows))
