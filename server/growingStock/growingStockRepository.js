const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')
const auditRepository = require('./../audit/auditRepository')
const Promise = require('bluebird')

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
              country_iso = $1
      ORDER BY year`, [countryIso])
    .then(result => result.rows.map(
      row => ({
        year: row.year,
        naturallyRegeneratingForest: row.naturally_regenerating_forest,
        naturallyRegeneratingForestAvg: row.naturally_regenerating_forest_avg,
        plantationForest: row.plantation_forest,
        plantationForestAvg: row.plantation_forest_avg,
        otherPlantedForest: row.other_planted_forest,
        otherPlantedForestAvg: row.other_planted_forest_avg,
        otherWoodedLand: row.other_wooded_land,
        otherWoodedLandAvg: row.other_wooded_land_avg
      })
    ))

module.exports.persistGrowingStock = (client, user, countryIso, values) =>
  auditRepository
    .insertAudit(client, user.id, 'persistGrowingStockValues', countryIso, 'growingStock')
    .then(() => client.query(`DELETE FROM growing_stock WHERE country_iso = $1`, [countryIso]))
    .then(() => Promise.all(values.map(value =>
      client.query(
        `INSERT INTO growing_stock
          (
              country_iso,
              year,
              naturally_regenerating_forest,
              naturally_regenerating_forest_avg,
              plantation_forest,
              plantation_forest_avg,
              other_planted_forest,
              other_planted_forest_avg,
              other_wooded_land,
              other_wooded_land_avg
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
        [countryIso, value.year,
          value.naturallyRegeneratingForest, value.naturallyRegeneratingForestAvg,
          value.plantationForest, value.plantationForestAvg,
          value.otherPlantedForest, value.otherPlantedForestAvg,
          value.otherWoodedLand, value.otherWoodedLandAvg])
    )))
