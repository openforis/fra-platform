const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')
const {toNumberOrNull} = require('../utils/databaseConversions')
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
          other_wooded_land_avg,
          planted_forest,
          planted_forest_avg,
          total_forest,
          total_forest_avg
      FROM
          growing_stock
      WHERE
              country_iso = $1
      ORDER BY year`, [countryIso])
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
        plantedForest: toNumberOrNull(row.planted_forest),
        plantedForestAvg: toNumberOrNull(row.planted_forest_avg),
        totalForest: toNumberOrNull(row.total_forest),
        totalForestAvg: toNumberOrNull(row.total_forest_avg)
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
              other_wooded_land_avg,
              planted_forest,
              planted_forest_avg,
              total_forest,
              total_forest_avg
              
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`,
        [countryIso, value.year,
          value.naturallyRegeneratingForest, value.naturallyRegeneratingForestAvg,
          value.plantationForest, value.plantationForestAvg,
          value.otherPlantedForest, value.otherPlantedForestAvg,
          value.otherWoodedLand, value.otherWoodedLandAvg,
          value.plantedForest, value.plantedForestAvg,
          value.totalForest, value.totalForestAvg])
    )))
