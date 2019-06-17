const Promise = require('bluebird')
const R = require('ramda')
const { AsyncParser } = require('json2csv')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')
const CountryConfigExporter = require('./_exportService/countryConfigExporter')
//1
const ExtentOfForestExporter = require('./_exportService/extentOfForestExporter')
const ForestCharacteristicsExporter = require('./_exportService/forestCharacteristicsExporter')
const SpecificForestCategoriesExporter = require('./_exportService/specificForestCategoriesExporter')
const OtherLandWithTreeCoverExporter = require('./_exportService/otherLandWithTreeCoverExporter')

const fetchTablesData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1a, 1b, 1e, 1f
  ExtentOfForestExporter.fetchData(countryIso),
  ForestCharacteristicsExporter.fetchData(countryIso),
  SpecificForestCategoriesExporter.fetchData(countryIso),
  OtherLandWithTreeCoverExporter.fetchData(countryIso),
])

const getData = async user => {
  AccessControl.checkAdminAccess(user)

  // prepare csv conversion
  const fields = [
    'region', 'countryIso', 'listNameEn', 'year',
    //country config
    ...CountryConfigExporter.fields,
    //1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.fields,
    ...ForestCharacteristicsExporter.fields,
    ...SpecificForestCategoriesExporter.fields,
    ...OtherLandWithTreeCoverExporter.fields,

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
  const fraYears = [1990, 2000, 2010, 2015, 2020]

  await Promise.all(
    countries.map(async country => {
      // read data for each country
      const [
        countryConfig,
        //1a, 1b, 1e, 1f
        eof, foc, specificForestCategories, otherLandWithTreeCover
      ] = await fetchTablesData(country.countryIso)

      // iterate over years
      fraYears.forEach((year, yearIdx) => {

        // prepare output object
        const object = {
          ...country,
          year,
          //country config
          ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
          //1a, 1b, 1e, 1f
          ...ExtentOfForestExporter.parseResultRow(eof, yearIdx, year, countryConfig),
          ...ForestCharacteristicsExporter.parseResultRow(foc, yearIdx, year),
          ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
          ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
        }

        asyncParser.input.push(JSON.stringify(object))

      })
    })
  )

  asyncParser.input.push(null)

  return csv
}

module.exports = {
  getData
}
