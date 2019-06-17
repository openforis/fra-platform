const Promise = require('bluebird')
const R = require('ramda')
const { AsyncParser } = require('json2csv')
const { sum, toFixed } = require('../../../common/bignumberUtils')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')
const FraValueService = require('../../eof/fraValueService')
const SpecificForestCategoriesExporter = require('./_exportService/specificForestCategoriesExporter')
const OtherLandWithTreeCoverExporter = require('./_exportService/otherLandWithTreeCoverExporter')

const fieldsForestCharacteristics = [
  'naturallyRegeneratingForest',
  'plantedForest',
  'plantationForest',
  'plantationForestIntroduced',
  'otherPlantedForest',
]

const getData = async user => {
  AccessControl.checkAdminAccess(user)

  // prepare csv conversion
  const fields = [
    'region', 'countryIso', 'listNameEn', 'year',
    //country config
    'boreal', 'temperate', 'tropical', 'subtropical',
    //1a
    'forestArea', 'otherWoodedLand', 'landArea',
    //1b
    ...fieldsForestCharacteristics,
    //1e
    ...SpecificForestCategoriesExporter.fields,
    //1f
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
      const countryIso = country.countryIso

      // read data for each country
      const [
        countryConfig,
        eof, foc, specificForestCategories, otherLandWithTreeCover//1
      ] = await Promise.all([
        CountryService.getCountryConfigFull(countryIso),
        // 1
        FraValueService.getFraValues('extentOfForest', countryIso),
        FraValueService.getFraValues('forestCharacteristics', countryIso),
        SpecificForestCategoriesExporter.fetchData(countryIso),
        OtherLandWithTreeCoverExporter.fetchData(countryIso),
      ])

      // iterate over years
      fraYears.forEach((year, yearIdx) => {

        const eofYear = R.pipe(
          R.prop('fra'),
          R.find(R.propEq('year', year)),
          R.defaultTo({})
        )(eof)

        const focYear = R.pipe(
          R.prop('fra'),
          R.find(R.propEq('year', year)),
          R.defaultTo({})
        )(foc)

        // 1b
        const naturallyRegeneratingForest = R.prop('naturalForestArea', focYear)
        const plantationForest = R.prop('plantationForestArea', focYear)
        const plantationForestIntroduced = R.prop('plantationForestIntroducedArea', focYear)
        const otherPlantedForest = R.prop('otherPlantedForestArea', focYear)
        const plantedForest = toFixed(sum([plantationForest, otherPlantedForest]))

        // prepare output object
        const object = {
          ...country,
          year,
          //country config
          boreal: R.path(['climaticDomainPercents2015', 'boreal'], countryConfig),
          temperate: R.path(['climaticDomainPercents2015', 'temperate'], countryConfig),
          tropical: R.path(['climaticDomainPercents2015', 'tropical'], countryConfig),
          subtropical: R.path(['climaticDomainPercents2015', 'subtropical'], countryConfig),
          //1a
          forestArea: R.prop('forestArea', eofYear),
          otherWoodedLand: R.prop('otherWoodedLand', eofYear),
          landArea: R.path(['faoStat', year, 'area'], countryConfig),
          //1b
          naturallyRegeneratingForest,
          plantedForest,
          plantationForest,
          plantationForestIntroduced,
          otherPlantedForest,
          //1e
          ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
          ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
        }

        asyncParser.input.push(JSON.stringify(object))

        // const row = [country.region, country.countryIso, country.listNameEn, year]
        // data.push(row.join(',') + NEW_LINE)
      })
    })
  )

  asyncParser.input.push(null)

  return csv
}

module.exports = {
  getData
}
