const Promise = require('bluebird')
const R = require('ramda')
const { AsyncParser } = require('json2csv')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')
const FraValueService = require('../../eof/fraValueService')

const getData = async user => {
  AccessControl.checkAdminAccess(user)

  // prepare csv conversion
  const fields = [
    'region', 'countryIso', 'listNameEn', 'year',
    //country config
    'boreal', 'temperate', 'tropical', 'subtropical',
    //1a
    'forestArea', 'otherWoodedLand', 'landArea'
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
      const countryIso = country.countryIso
      const [countryConfig, eof] = await Promise.all([
        CountryService.getCountryConfigFull(countryIso),
        FraValueService.getFraValues('extentOfForest', countryIso)
      ])

      // iterate over years
      fraYears.forEach(year => {

        const eofYear = R.pipe(
          R.prop('fra'),
          R.find(R.propEq('year', year)),
          R.defaultTo({})
        )(eof)

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
