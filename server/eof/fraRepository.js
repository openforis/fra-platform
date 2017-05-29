const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const emptyFraForestArea = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length === 0)

module.exports.persistFraValues = (countryIso, year, fraValues, estimated = false) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
    isEmpty ? insertFraForestArea(countryIso, year, fraValues, estimated)
      : updateFraForestArea(countryIso, year, fraValues, estimated))

const insertFraForestArea = (countryIso, year, fraValues, estimated) =>
  db.query(`INSERT INTO 
             eof_fra_values 
             (country_iso, year, forest_area, estimated) 
             VALUES 
             ($1, $2, $3, $4, $5)`,
    [countryIso,
     year,
     fraValues.forestArea,
     fraValues.otherWoodenLand,
     estimated])

const updateFraForestArea = (countryIso, year, fraValues, estimated) =>
  db.query(`UPDATE 
            eof_fra_values 
            SET 
             forest_area = $3,
             other_wooden_land = $4,
             estimated = $5 
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
     year,
     fraValues.forestArea,
     fraValues.otherWoodenLand,
     estimated])

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: row.forest_area,
    otherWoodenLand: row.other_wooden_land,
    name: row.year + '',
    type: 'fra',
    year: Number(row.year),
    estimated: row.estimated
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query('SELECT year, forest_area, other_wooden_land from eof_fra_values WHERE country_iso = $1', [countryIso])
    .then((result) => R.reduce(forestAreaReducer, {}, result.rows))
