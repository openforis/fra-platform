String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement)
}
import * as R from 'ramda'
import * as Promise from 'bluebird'
import * as fs = Promise.promisifyAll(require('fs'))
import * as csv = Promise.promisifyAll(require('csv'))

const exampleUsage =
  'node certifiedAreasCountryUdater.js ./exampleData/FAOCountriesNOCS_EXPORT.csv ./exampleData/FRACountries.csv ./exampleData/EUCountries.csv /tmp/countriesSQL.sql'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the countries csv file> <path of the FRA countries csv file> <path of the EU countries csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const countriesInputCsvFile = process.argv[2]
console.log('reading file', countriesInputCsvFile)
const fraCountriesInputCsvFile = process.argv[3]
const euCountriesInputCsvFile = process.argv[4]
const outputFile = process.argv[5]

const readCsv = async fileName => {
  const rawFile = await fs.readFileAsync(fileName, {encoding: 'utf-8'})
  const csvFile = await csv.parseAsync(rawFile)
  return csvFile
}

const getCountryISOs = async fileName => {
  const parsedCountries = await readCsv(fileName)
  return R.pipe(
    R.slice(1, undefined),
    R.map(c => c[0])
  )(parsedCountries)
}

const getCountrySqlUpdates = async (countriesFileName, fraCountriesFileName, euCountriesFileName) => {
  const fraCountries = await getCountryISOs(fraCountriesFileName)
  const euCountries = await getCountryISOs(euCountriesFileName)

  const allCountries = await readCsv(countriesFileName)
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
      fullNameRu: c[10],
      panEuropean: R.contains(c[1], euCountries)
    })),
    R.filter(c => R.contains(c.iso3, fraCountries))
  )(allCountries)

  console.log(countries[1])

  const sqls =
    R.map(c => `
    UPDATE
        country
    SET
        list_name_en = '${c.listNameEn.replaceAll(`'`, `''`)}',
        full_name_en = '${c.fullNameEn.replaceAll(`'`, `''`)}',
        list_name_es = '${c.listNameEs.replaceAll(`'`, `''`)}',
        full_name_es = '${c.fullNameEs.replaceAll(`'`, `''`)}',
        list_name_fr = '${c.listNameFr.replaceAll(`'`, `''`)}',
        full_name_fr = '${c.fullNameFr.replaceAll(`'`, `''`)}',
        list_name_ru = '${c.listNameRu.replaceAll(`'`, `''`)}',
        full_name_ru = '${c.fullNameRu.replaceAll(`'`, `''`)}',
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

const update = async (countriesInputCsvFile, fraCountriesInputCsvFile, euCountriesInputCsvFile, outputFile) => {
  try {
    const sqlUpdates = await getCountrySqlUpdates(countriesInputCsvFile, fraCountriesInputCsvFile, euCountriesInputCsvFile)
    await writeSqlUpdates(sqlUpdates, outputFile)
  } catch (e) { console.log(e) }
}

update(countriesInputCsvFile, fraCountriesInputCsvFile, euCountriesInputCsvFile, outputFile)
