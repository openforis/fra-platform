// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CSVOutputW... Remove this comment to see the full error message
const CSVOutputWithVariables = require('../csvOutputWithVariables')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountryCon... Remove this comment to see the full error message
const CountryConfigExporter = require('../exporter/countryConfigExporter')
// 1a
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExtentOfFo... Remove this comment to see the full error message
const ExtentOfForestExporter = require('../fraYears/section_1/extentOfForestExporter')

// 5
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Disturbanc... Remove this comment to see the full error message
const DisturbancesExporter = require('./section_5/disturbancesExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AreaAffect... Remove this comment to see the full error message
const AreaAffectedByFireExporter = require('./section_5/areaAffectedByFireExporter')

const YEARS_ANNUAL = R.range(2000, 2018)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1a,
    ExtentOfForestExporter.fetchData(countryIso),
    // 5a, 5b
    DisturbancesExporter.fetchData(countryIso),
    AreaAffectedByFireExporter.fetchData(countryIso),
  ])

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a
    extentOfForest,
    // 5a
    disturbances,
    areaAffectedByFire,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_ANNUAL.map((year: any, yearIdx: any) => ({
    ...country,
    year,

    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),

    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    // 5a, 5b
    ...DisturbancesExporter.parseResultRow(disturbances, yearIdx, year),
    ...AreaAffectedByFireExporter.parseResultRow(areaAffectedByFire, yearIdx, year),
  }))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = (includeVariableFolders = true) => {
  const fieldsVariables = [
    // 5a, 5b
    ...DisturbancesExporter.fieldsWithLabels,
    ...AreaAffectedByFireExporter.fieldsWithLabels,
  ]

  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels

  return new CSVOutputWithVariables(
    'Annual',
    fieldsVariables,
    fieldsCountryConfig,
    YEARS_ANNUAL,
    includeVariableFolders
  )
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
