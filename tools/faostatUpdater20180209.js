const Promise = require('bluebird')
const R = require('ramda')
const countryConfig = require('../server/controller/country/countryConfig')

const fs = Promise.promisifyAll(require('fs'))
const csv = Promise.promisifyAll(require('csv'))

const exampleUsage =
  'node faostatUpdater.js exampleData/FAOSTAT_data_11-9-2017.csv /tmp/countryConfigWithUpdatedFaostat.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the faostat csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const faoStatCsvFile = process.argv[2]
console.log('reading file', faoStatCsvFile)
const outputFile = process.argv[3]

const update = async (faoStatCsvFile, outputFile) => {
  try {
    const rawFaostatData = await fs.readFileAsync(faoStatCsvFile, { encoding: 'utf-8' })
    const parsedFaostatData = await csv.parseAsync(rawFaostatData)
    const faoStatData = R.slice(1, undefined, parsedFaostatData)
    const countryFaoStataData = R.reduce(
      (result, row) => {
        const faoStat = R.reduce(
          (countryObj, year) => R.assoc(year, { area: Number(row[4]), estimate: year !== 2015 }, countryObj),
          {},
          R.range(1980, 2021)
        )
        return R.assoc(row[0], { faoStat }, result)
      },
      {},
      faoStatData
    )

    const merged = R.mergeDeepLeft(countryFaoStataData, countryConfig)
    await fs.writeFileAsync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')

    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')
  } catch (e) {
    console.log(e)
  }
}

update(faoStatCsvFile, outputFile)
