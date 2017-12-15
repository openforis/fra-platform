const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')
const auditRepository = require('./../audit/auditRepository')
const Promise = require('bluebird')

module.exports.readGrowingStock = (countryIso, tableName) =>
  db.query(`
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

module.exports.persistBothGrowingStock = async (client, user, countryIso, values) => {
  await persistGrowingStock(client, user, countryIso, values.avgTable, 'growing_stock_avg')
  await persistGrowingStock(client, user, countryIso, values.totalTable,'growing_stock_total')
}

module.exports.persistGrowingStock = (client, user, countryIso, values, tableName) =>
  auditRepository
    .insertAudit(client, user.id, 'persistGrowingStockValues', countryIso, 'growingStock')
    .then(() => client.query(`DELETE FROM ${tableName} WHERE country_iso = $1`, [countryIso]))
    .then(() => Promise.all(values.map(value =>
      client.query(
        `INSERT INTO ${tableName}
          (
              country_iso,
              year,
              naturally_regenerating_forest,
              plantation_forest,
              other_planted_forest,
              other_wooded_land,
          )
          VALUES ($1, $2, $3, $4, $5, $6);`,
        [countryIso,
          value.year,
          value.naturallyRegeneratingForest,
          value.plantationForest,
          value.otherPlantedForest,
          value.otherWoodedLand])
    )))

module.exports.getEofArea = (countryIso) =>
  db.query(`
    SELECT
      year,
      forest_area,
      other_wooded_land
    FROM
      eof_fra_values
    WHERE
      country_iso = $1
    ORDER BY year`, [countryIso])
  .then(res => R.map(camelize, res.rows))

module.exports.getFocArea = (countryIso) =>
  db.query(`
    SELECT
      year,
      natural_forest_area,
      plantation_forest_area,
      other_planted_forest_area
    FROM
      foc_fra_values
    WHERE
      country_iso = $1
    ORDER BY year`, [countryIso])
  .then(res => R.map(camelize, res.rows))
