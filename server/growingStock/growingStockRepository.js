const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')
const auditRepository = require('./../audit/auditRepository')
const Promise = require('bluebird')

module.exports.readGrowingStock = (countryIso, tableName) =>
  db
    .query(`
      SELECT
          year,
          naturally_regenerating_forest,
          plantation_forest,
          other_planted_forest,
          other_wooded_land
      FROM
          ${tableName}
      WHERE
          country_iso = $1
      ORDER BY year`, [countryIso])
    .then(result => result.rows.map(
      row => ({
        year: row.year,
        naturallyRegeneratingForest: row.naturally_regenerating_forest,
        plantationForest: row.plantation_forest,
        otherPlantedForest: row.other_planted_forest,
        otherWoodedLand: row.other_wooded_land
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

module.exports.getEofArea = (countryIso) => {
  return db.query(`
    SELECT
      year,
      forest_area,
      other_wooded_land
    FROM
      eof_fra_values
    WHERE
      country_iso = $1
    ORDER BY year`, [countryIso]
  ).then(res => R.map(camelize, res.rows))
}

module.exports.getFocArea = (countryIso) => {
  return db.query(`
    SELECT
      year,
      natural_forest_area,
      plantation_forest_area,
      other_planted_forest_area
    FROM
      foc_fra_values
    WHERE
      country_iso = $1
    ORDER BY year`, [countryIso]
  ).then(res => R.map(camelize, res.rows))
}
