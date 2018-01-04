String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement)
}
const R = require('ramda')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const csv = Promise.promisifyAll(require('csv'))
const countryConfig = require('../server/country/countryConfig')

const exampleUsage =
  'node certifiedAreasCountryUdater.js exampleData/Certification.csv /tmp/countryConfigWithCertifiedAreas.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the countries csv file> <path of the FRA countries csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const countriesInputCsvFile = process.argv[2]
console.log('reading file', countriesInputCsvFile)
const fraCountriesInputCsvFile = process.argv[3]
const outputFile = process.argv[4]

const getCountrySqlUpdates = async (countriesFileName, fraCountriesFileName) => {
  const rawFRACountries = await fs.readFileAsync(fraCountriesFileName, {encoding: 'utf-8'})
  const parsedFRACountries = await csv.parseAsync(rawFRACountries)
  const fraCountries = R.pipe(
    R.slice(1, undefined),
    R.map(c => c[0])
  )(parsedFRACountries)

  console.log(fraCountries.length)

  const rawCountries = await fs.readFileAsync(countriesFileName, {encoding: 'utf-8'})
  const parsedCountries = await csv.parseAsync(rawCountries)
  const countries = R.pipe(
    R.slice(1, undefined),
    R.map(c => ({
      iso3: c[1],
      iso2: c[2],
      listNameEn: c[3],
      fullNameEn: c[4],
      listNameEs: c[5],
      fullNameEs: c[6],
      listNameFr: c[7],
      fullNameFr: c[8],
      listNameRu: c[9],
      fullNameRu: c[10]
    })),
    R.filter(c => R.contains(c.iso3, fraCountries))
  )(parsedCountries)

  console.log(countries.length)

  const sqls =
    R.map(c => `
    UPDATE
        country
    SET
        country_iso2 = '${c.iso2.replaceAll('n/a', 'NA')}',
        list_name_en = '${c.listNameEn.replaceAll(`'`, `''`)}',
        full_name_en = '${c.fullNameEn.replaceAll(`'`, `''`)}',
        list_name_es = '${c.listNameEs.replaceAll(`'`, `''`)}',
        full_name_es = '${c.fullNameEs.replaceAll(`'`, `''`)}',
        list_name_fr = '${c.listNameFr.replaceAll(`'`, `''`)}',
        full_name_fr = '${c.fullNameFr.replaceAll(`'`, `''`)}',
        list_name_ru = '${c.listNameRu.replaceAll(`'`, `''`)}',
        full_name_ru = '${c.fullNameRu.replaceAll(`'`, `''`)}'
    WHERE
        country_iso = '${c.iso3}';
    `)
    (countries)

  return sqls
}

const writeSqlUpdates = async (countries, outputFile) => {
  const stream = await fs.createWriteStream(outputFile)
  return stream.once('open', fd => {
    R.forEach(c => stream.write(c), countries)
    stream.end()
  })
}

const update = async (countriesInputCsvFile, fraCountriesInputCsvFile, outputFile) => {
  try {
    const sqlUpdates = await getCountrySqlUpdates(countriesInputCsvFile, fraCountriesInputCsvFile)
    await writeSqlUpdates(sqlUpdates, outputFile)
  } catch (e) { console.log(e) }
}

update(countriesInputCsvFile, fraCountriesInputCsvFile, outputFile)
