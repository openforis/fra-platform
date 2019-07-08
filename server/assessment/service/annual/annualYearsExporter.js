const R = require('ramda')
const Promise = require('bluebird')
const CSVOutput = require('../csvOutput')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
//5
const DisturbancesExporter = require('./section_5/disturbancesExporter')
const AreaAffectedByFireExporter = require('./section_5/areaAffectedByFireExporter')

const YEARS_ANNUAL = R.range(2000, 2018)

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //5a, 5b
  DisturbancesExporter.fetchData(countryIso),
  AreaAffectedByFireExporter.fetchData(countryIso),

])

const getCountryData = async country => {
  const [
    countryConfig,
    //5a
    disturbances, areaAffectedByFire
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_ANNUAL.map((year, yearIdx) => ({
    ...country,
    year,
    //country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    //5a, 5b
    ...DisturbancesExporter.parseResultRow(disturbances, yearIdx, year),
    ...AreaAffectedByFireExporter.parseResultRow(areaAffectedByFire, yearIdx, year),
  }))

}

const getCsvOutput = () => {
  const fields = [
    'year',
    //country config
    ...CountryConfigExporter.fields,
    //5a, 5b
    ...DisturbancesExporter.fieldsWithLabels,
    ...AreaAffectedByFireExporter.fieldsWithLabels,
  ]

  return new CSVOutput('Annual', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
