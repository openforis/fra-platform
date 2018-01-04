const R = require('ramda')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const csv = Promise.promisifyAll(require('csv'))

const countriesInputCsvFile = 'exampleData/FAOCountriesNOCS_EXPORT.csv'
const flagDir = '../web-resources/img/flags/1x1'
console.log('reading file', countriesInputCsvFile)

const doIt = async () => {

  const rawCountries = await fs.readFileAsync(countriesInputCsvFile, {encoding: 'utf-8'})
  const parsedCountries = await csv.parseAsync(rawCountries)
  const countries = R.pipe(
    R.slice(1, undefined),
    R.map(c => ({
      iso3: c[1],
      iso2: c[2],
      listNameEn: c[3]
    }))
  )(parsedCountries)
  R.forEach (country => {
    console.log(country)
    const oldfileName = flagDir + '/' + country.iso2.toLowerCase() + '.svg'
    const newFileName = flagDir + '/' + country.iso3 + '.svg'
    if (fs.existsSync(oldfileName)) {
      console.log('renaming', oldfileName, 'to', newFileName)
      fs.renameSync(oldfileName, newFileName)
    } else {
      console.log('Could not find', oldfileName)
    }
  }, countries)
}

doIt().then(() => console.log('done')).catch(err=>console.log('error', err))
