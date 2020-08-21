const R = require('ramda')
const Promise = require('bluebird')
const CSVOutputWithVariables = require('../csvOutputWithVariables')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
// 1a
const ExtentOfForestExporter = require('../fraYears/section_1/extentOfForestExporter')

// 5
const DisturbancesExporter = require('./section_5/disturbancesExporter')
const AreaAffectedByFireExporter = require('./section_5/areaAffectedByFireExporter')

const YEARS_ANNUAL = R.range(2000, 2018)

const fetchCountryData = async (countryIso) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1a,
    ExtentOfForestExporter.fetchData(countryIso),
    // 5a, 5b
    DisturbancesExporter.fetchData(countryIso),
    AreaAffectedByFireExporter.fetchData(countryIso),
  ])

const getCountryData = async (country) => {
  const [
    countryConfig,
    // 1a
    extentOfForest,
    // 5a
    disturbances,
    areaAffectedByFire,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_ANNUAL.map((year, yearIdx) => ({
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

const getCsvOutput = (noVariableFolder) => {
  const fieldsVariables = [
    // 5a, 5b
    ...DisturbancesExporter.fieldsWithLabels,
    ...AreaAffectedByFireExporter.fieldsWithLabels,
  ]

  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels

  return new CSVOutputWithVariables('Annual', fieldsVariables, fieldsCountryConfig, YEARS_ANNUAL, noVariableFolder)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
