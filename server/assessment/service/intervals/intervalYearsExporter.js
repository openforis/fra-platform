const Promise = require('bluebird')
const CSVOutput = require('../csvOutput')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
//1
const ForestExpansionDeforestationNetChangeExporter = require('./section_1/forestExpansionDeforestationNetChangeExporter')
const AnnualReforestationExporter = require('./section_1/annualReforestationExporter')

const YEARS_INTERVAL = [
  '1990-2000',
  '2000-2010',
  '2010-2015',
  '2015-2020',
]

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1c, 1d
  ForestExpansionDeforestationNetChangeExporter.fetchData(countryIso),
  AnnualReforestationExporter.fetchData(countryIso),

])

const getCountryData = async country => {
  const [
    countryConfig,
    //1c
    forestExpansionDeforestationNetChange, annualReforestation
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_INTERVAL.map((year, yearIdx) => ({
    ...country,
    year,
    //country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    //1c, 1d
    ...ForestExpansionDeforestationNetChangeExporter.parseResultRow(forestExpansionDeforestationNetChange, yearIdx, year, countryConfig),
    ...AnnualReforestationExporter.parseResultRow(annualReforestation, yearIdx, year, countryConfig),
  }))

}

const getCsvOutput = () => {
  const fields = [
    'year',
    //country config
    ...CountryConfigExporter.fields,
    //1c, 1d
    ...ForestExpansionDeforestationNetChangeExporter.fieldsWithLabels,
    ...AnnualReforestationExporter.fieldsWithLabels,
  ]

  return new CSVOutput('Intervals', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
