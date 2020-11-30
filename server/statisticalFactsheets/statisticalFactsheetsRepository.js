const camelize = require('camelize')
const db = require('../db/db')

const getCountries = async (regionCode) => {
  const query = `select country_iso from country_region ${regionCode ? `where region_code = '${regionCode}' ` : ''}`

  const result = await db.query(query)
  return camelize(result.rows).map((region) => region.countryIso)
}

const getRegions = async () => {
  const query = `select distinct region_code from country_region`

  const result = await db.query(query)
  return camelize(result.rows).map((region) => region.regionCode)
}

const _joinArray = (arr) => arr.map((entry) => `'${entry}'`).join(', ')

const getGlobalStatisticalFactsheetData = async (schemaName, rowNames) => {
  const query = `
SELECT 'WO'                     AS country_iso,
       row_name,
       sum(coalesce("1990", 0)) AS "1990",
       sum(coalesce("2000", 0)) AS "2000",
       sum(coalesce("2010", 0)) AS "2010",
       sum(coalesce("2015", 0)) AS "2015",
       sum(coalesce("2020", 0)) AS "2020"
FROM ${schemaName}.country_aggregate
WHERE row_name IN (${_joinArray(rowNames)})
GROUP BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

const getStatisticalFactsheetData = async (schemaName, rowNames, countries) => {
  // TODO: give country_iso - is this even needed?
  const query = `
SELECT 'TODO'                     AS country_iso,
       row_name,
       sum(coalesce("1990", 0)) AS "1990",
       sum(coalesce("2000", 0)) AS "2000",
       sum(coalesce("2010", 0)) AS "2010",
       sum(coalesce("2015", 0)) AS "2015",
       sum(coalesce("2020", 0)) AS "2020"
FROM ${schemaName}.country_aggregate
WHERE row_name IN (${_joinArray(rowNames)})
AND country_iso IN (${_joinArray(countries)})
GROUP BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

const getSingleCountryStatisticalFactsheetData = async (schemaName, rowNames, countryIso) => {
  const query = `
SELECT 'WO'                     AS country_iso,
       row_name,
       sum(coalesce("1990", 0)) AS "1990",
       sum(coalesce("2000", 0)) AS "2000",
       sum(coalesce("2010", 0)) AS "2010",
       sum(coalesce("2015", 0)) AS "2015",
       sum(coalesce("2020", 0)) AS "2020"
FROM ${schemaName}.statistical_factsheets_view
WHERE row_name IN (${_joinArray(rowNames)})
AND level = '${countryIso}'
GROUP BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

module.exports = {
  getCountries,
  getRegions,
  getSingleCountryStatisticalFactsheetData,
  getGlobalStatisticalFactsheetData,
  getStatisticalFactsheetData,
}
