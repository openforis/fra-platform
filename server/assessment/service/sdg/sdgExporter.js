const R = require('ramda')
const Promise = require('bluebird')
const CSVOutputWithVariables = require('../csvOutputWithVariables')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
//1
const ExtentOfForestExporter = require('./section_1/extentOfForestExporter')
//2
const BiomassStockExporter = require('./section_2/biomassStockExporter')
//3
const ForestAreaWithinProtectedAreasExporter = require('./section_3/forestAreaWithinProtectedAreasExporter')

const YEARS = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1a
  ExtentOfForestExporter.fetchData(countryIso),
  //2c
  BiomassStockExporter.fetchData(countryIso),
  //3b
  ForestAreaWithinProtectedAreasExporter.fetchData(countryIso),
])

const getCountryData = async country => {
  const [
    countryConfig,
    //1a
    extentOfForest,
    //2c
    biomassStock,
    //3b
     forestAreaWithinProtectedAreas,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS.map((year, yearIdx) => ({
    ...country,
    year,

    //forestArea2020
    forestArea2020: R.pipe(
      R.prop('fra'),
      R.find(R.propEq('year', 2020)),
      R.propOr('', 'forestArea')
    )(extentOfForest),

    //country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year, extentOfForest),
    //1a
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    //2c
    ...BiomassStockExporter.parseResultRow(biomassStock, yearIdx, year),
    //3b
    ...ForestAreaWithinProtectedAreasExporter.parseResultRow(forestAreaWithinProtectedAreas, yearIdx, year),
  }))

}

const getCsvOutput = () => {
  const fieldsVariables = [
    //1a
    ...ExtentOfForestExporter.fieldsWithLabels,
    //2c
    ...BiomassStockExporter.fieldsWithLabels,
    //3b
    ...ForestAreaWithinProtectedAreasExporter.fieldsWithLabels,
  ]

  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels

  return new CSVOutputWithVariables('SDG_data', fieldsVariables, fieldsCountryConfig, YEARS)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
