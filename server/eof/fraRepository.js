const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const emptyFraForestArea = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length == 0)

module.exports.persistFraForestArea = (countryIso, year, forestArea, estimated = false) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
    isEmpty ? insertFraForestArea(countryIso, year, forestArea, estimated)
      : updateFraForestArea(countryIso, year, forestArea, estimated))

const insertFraForestArea = (countryIso, year, forestArea, estimated) =>
  db.query('INSERT INTO eof_fra_values (country_iso, year, forest_area, estimated) VALUES ($1, $2, $3, $4)',
    [countryIso, year, forestArea, estimated])

const updateFraForestArea = (countryIso, year, forestArea, estimated) =>
  db.query('UPDATE eof_fra_values SET forest_area = $3, estimated = $4 WHERE country_iso = $1 AND year = $2',
    [countryIso, year, forestArea, estimated])

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: Number(row.forest_area),
    name: row.year + '',
    type: 'fra',
    year: Number(row.year)
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query('SELECT year, forest_area from eof_fra_values WHERE country_iso = $1', [countryIso])
    .then((result) => R.reduce(forestAreaReducer, {}, result.rows))
