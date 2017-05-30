const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const emptyFraForestArea = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length === 0)

module.exports.persistFraValues = (countryIso, year, fraValues, estimated = false) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
    isEmpty
      ? insertFraForestArea(countryIso, year, fraValues, estimated)
      : updateFraForestArea(countryIso, year, fraValues, estimated))

const insertFraForestArea = (countryIso, year, fraValues, estimated) =>
  db.query(`INSERT INTO 
             eof_fra_values 
             (country_iso, year, forest_area, other_wooded_land, other_land, estimated) 
             VALUES 
             ($1, $2, $3, $4, $5, $6)`,
    [countryIso,
     year,
     fraValues.forestArea,
     fraValues.otherWoodedLand,
     fraValues.otherLand,
     estimated])

const updateFraForestArea = (countryIso, year, fraValues, estimated) =>
  db.query(`UPDATE 
            eof_fra_values 
            SET 
             forest_area = $3,
             other_wooded_land = $4,
             other_land = $5,
             estimated = $6 
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
     year,
     fraValues.forestArea,
     fraValues.otherWoodedLand,
     fraValues.otherLand,
     estimated])

const toNumberOrNull = (numericFromDb) => numericFromDb === null
  ? null
  : Number(numericFromDb)

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: toNumberOrNull(row.forest_area),
    otherWoodedLand: toNumberOrNull(row.other_wooded_land),
    otherLand: toNumberOrNull(row.other_land),
    name: row.year + '',
    type: 'fra',
    year: Number(row.year),
    estimated: row.estimated
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query(
    'SELECT year, forest_area, other_wooded_land, other_land from eof_fra_values WHERE country_iso = $1',
    [countryIso]
  ).then((result) => R.reduce(forestAreaReducer, {}, result.rows))
