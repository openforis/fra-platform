const Promise = require('bluebird')
const R = require('ramda')
const { AsyncParser } = require('json2csv')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')
const CountryConfigExporter = require('./_exportService/countryConfigExporter')
//1
const ExtentOfForestExporter = require('./_exportService/section_1/extentOfForestExporter')
const ForestCharacteristicsExporter = require('./_exportService/section_1/forestCharacteristicsExporter')
const SpecificForestCategoriesExporter = require('./_exportService/section_1/specificForestCategoriesExporter')
const OtherLandWithTreeCoverExporter = require('./_exportService/section_1/otherLandWithTreeCoverExporter')
//2
const GrowingStockExporter = require('./_exportService/section_2/growingStockExporter')

const YEARS_FRA = [1990, 2000, 2010, 2015, 2020]

const getExporterFields = exporter =>
  exporter.fields.map(field => ({
    value: field,
    label: R.isEmpty(exporter.tableNo)
      ? field
      : `${exporter.tableNo}_${field}`,
  }))

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1a, 1b, 1e, 1f
  ExtentOfForestExporter.fetchData(countryIso),
  ForestCharacteristicsExporter.fetchData(countryIso),
  SpecificForestCategoriesExporter.fetchData(countryIso),
  OtherLandWithTreeCoverExporter.fetchData(countryIso),
  //2a
  GrowingStockExporter.fetchData(countryIso),
])

const getCountryData = async country => {
  const [
    countryConfig,
    //1a, 1b, 1e, 1f
    eof, foc, specificForestCategories, otherLandWithTreeCover,
    //2a
    gs,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_FRA.map((year, yearIdx) => ({
    ...country,
    year,
    //country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    //1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.parseResultRow(eof, yearIdx, year, countryConfig),
    ...ForestCharacteristicsExporter.parseResultRow(foc, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
    //2a
    ...GrowingStockExporter.parseResultRow(gs, yearIdx, year),
  }))

}

const getData = async user => {
  AccessControl.checkAdminAccess(user)

  // prepare csv conversion
  const fields = [
    'region', 'countryIso', 'listNameEn', 'year',
    //country config
    ...getExporterFields(CountryConfigExporter),
    //1a, 1b, 1e, 1f
    ...getExporterFields(ExtentOfForestExporter),
    ...getExporterFields(ForestCharacteristicsExporter),
    ...getExporterFields(SpecificForestCategoriesExporter),
    ...getExporterFields(OtherLandWithTreeCoverExporter),
    //2a
    ...getExporterFields(GrowingStockExporter),

  ]
  const opts = { fields }
  const asyncParser = new AsyncParser(opts, {})

  let csv = ''
  asyncParser.processor
    .on('data', chunk => (csv += chunk.toString()))
    // .on('end', () => console.log(csv))
    .on('error', err => { throw new Error(err) })

  // prepare data
  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  await Promise.each(
    countries.map(getCountryData),
    countryResult => {
      asyncParser.input.push(JSON.stringify(countryResult))
    }
  )

  asyncParser.input.push(null)

  return csv
}

module.exports = {
  getData
}
