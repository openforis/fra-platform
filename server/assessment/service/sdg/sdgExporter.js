const R = require('ramda')
const Promise = require('bluebird')
const CSVOutputWithVariables = require('../csvOutputWithVariables')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
//1
const ExtentOfForestExporter = require('../fraYears/section_1/extentOfForestExporter')
const ForestCharacteristicsExporter = require('./section_1/forestCharacteristicsExporter')
const SpecificForestCategoriesExporter = require('./section_1/specificForestCategoriesExporter')

//2
const GrowingStockExporter = require('./section_2/growingStockExporter')
const BiomassStockExporter = require('./section_2/biomassStockExporter')
const CarbonStockExporter = require('./section_2/carbonStockExporter')
//3
const ForestAreaWithinProtectedAreasExporter = require('./section_3/forestAreaWithinProtectedAreasExporter')

const YEARS = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1a, 1b, 1e
  ExtentOfForestExporter.fetchData(countryIso),
  ForestCharacteristicsExporter.fetchData(countryIso),
  SpecificForestCategoriesExporter.fetchData(countryIso),
  //2a, 2c, 2d
  GrowingStockExporter.fetchData(countryIso),
  BiomassStockExporter.fetchData(countryIso),
  CarbonStockExporter.fetchData(countryIso),
  //3b
  ForestAreaWithinProtectedAreasExporter.fetchData(countryIso),
])

const getCountryData = async country => {
  const [
    countryConfig,
    //1a, 1b, 1e
    extentOfForest, forestCharacteristics, specificForestCategories,
    //2a, 2c
    growingStock, biomassStock, carbonStock,
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
    //1a, 1b, 1e
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    ...ForestCharacteristicsExporter.parseResultRow(forestCharacteristics, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    //2a, 2c, 2d
    ...GrowingStockExporter.parseResultRow(growingStock, yearIdx, year),
    ...BiomassStockExporter.parseResultRow(biomassStock, yearIdx, year),
    ...CarbonStockExporter.parseResultRow(carbonStock, yearIdx, year),
    //3b
    ...ForestAreaWithinProtectedAreasExporter.parseResultRow(forestAreaWithinProtectedAreas, yearIdx, year),
  }))

}

const getCsvOutput = () => {
  const fieldsVariables = [
    //1a, 1b, 1e
    ...ExtentOfForestExporter.fieldsWithLabels,
    ...ForestCharacteristicsExporter.fieldsWithLabels,
    ...SpecificForestCategoriesExporter.fieldsWithLabels,
    //2a, 2c, 2d
    ...GrowingStockExporter.fieldsWithLabels,
    ...BiomassStockExporter.fieldsWithLabels,
    ...CarbonStockExporter.fieldsWithLabels,
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
