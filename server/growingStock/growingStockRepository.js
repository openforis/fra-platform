const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')
const {toNumberOrNull} = require('../utils/databaseConversions')

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
              country_iso = $1`, [countryIso])
    .then(result => result.rows.map(
      row => ({
        year: Number(row.year),
        naturallyRegeneratingForest: toNumberOrNull(row.naturally_regenerating_forest),
        naturallyRegeneratingForestAvg: toNumberOrNull(row.naturally_regenerating_forest_avg),
        plantationForest: toNumberOrNull(row.plantation_forest),
        plantationForestAvg: toNumberOrNull(row.plantation_forest_avg),
        otherPlantedForest: toNumberOrNull(row.other_planted_forest),
        otherPlantedForestAvg: toNumberOrNull(row.other_planted_forest_avg),
        otherWoodedLand: toNumberOrNull(row.other_wooded_land),
        otherWoodedLandAvg: toNumberOrNull(row.other_wooded_land_avg),
      })
    ))
