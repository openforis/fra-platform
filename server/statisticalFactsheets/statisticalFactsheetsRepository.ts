// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

const _joinArray = (arr: any) => arr.map((entry: any) => `'${entry}'`).join(', ')

const getGlobalStatisticalFactsheetData = async (schemaName: any, rowNames: any) => {
  const query = `
SELECT
       row_name,
       count(country_iso) as count,
       sum(coalesce("1990", 0)) AS "1990",
       sum(coalesce("2000", 0)) AS "2000",
       sum(coalesce("2010", 0)) AS "2010",
       sum(coalesce("2015", 0)) AS "2015",
       sum(coalesce("2020", 0)) AS "2020"
FROM ${schemaName}.country_aggregate
WHERE row_name IN (${_joinArray(rowNames)})
GROUP BY row_name
ORDER BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getStatist... Remove this comment to see the full error message
const getStatisticalFactsheetData = async (schemaName: any, rowNames: any, countries: any) => {
  // TODO: give country_iso - is this even needed?
  const query = `
SELECT
       row_name,
       count(country_iso) as count,
       sum(coalesce("1990", 0)) AS "1990",
       sum(coalesce("2000", 0)) AS "2000",
       sum(coalesce("2010", 0)) AS "2010",
       sum(coalesce("2015", 0)) AS "2015",
       sum(coalesce("2020", 0)) AS "2020"
FROM ${schemaName}.country_aggregate
WHERE row_name IN (${_joinArray(rowNames)})
AND country_iso IN (${_joinArray(countries)})
GROUP BY row_name
ORDER BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

const getSingleCountryStatisticalFactsheetData = async (schemaName: any, rowNames: any, countryIso: any) => {
  const query = `
SELECT
    row_name,
    "1990",
    "2000",
    "2010",
    "2015",
    "2020"
FROM ${schemaName}.statistical_factsheets_view
WHERE row_name IN (${_joinArray(rowNames)})
  AND level = '${countryIso}'
ORDER BY row_name
`

  const result = await db.query(query)
  return camelize(result.rows)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'countryIsos' implicitly has an 'any[]' ... Remove this comment to see the full error message
const getPrimaryForestData = async (schemaName: any, countryIsos = []) => {
  const hasCountries = countryIsos.length > 0
  let validCountries = ''
  if (hasCountries) {
    validCountries = `AND country_iso in (${_joinArray(countryIsos)})`
  }
  const query = `
with valid_countries as (
    select country_iso from ${schemaName}.country_aggregate where "2020" is not null and row_name = 'primary_forest' ${validCountries}
)
SELECT 'primary_forest_ratio' as row_name,
       SUM(pf."2020") / SUM(fa."2020") as "2020"
FROM ${schemaName}.country_aggregate pf
JOIN ${schemaName}.country_aggregate fa USING (country_iso)
WHERE pf.row_name = 'primary_forest'
  AND pf.country_iso in
      (SELECT * FROM valid_countries)
  AND fa.country_iso in
      (SELECT * FROM valid_countries)
  AND fa.row_name = 'forest_area'
`

  const result = await db.query(query)
  return camelize(result.rows)
}

module.exports = {
  getSingleCountryStatisticalFactsheetData,
  getGlobalStatisticalFactsheetData,
  getStatisticalFactsheetData,
  getPrimaryForestData,
}
