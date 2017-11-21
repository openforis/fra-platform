const R = require('ramda')
const csv = require('csv')
const faoStat = require('./faoStat')
const countryConfig = require('../server/country/countryConfig')
const fs = require('fs')

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

const addFaostatValuesForYearsUntil2020 = faostatData => {
  return R.reduce(
    (result, countryRow) => {
      const iso = countryRow[0]
      const faoStat = R.path([1, 'faoStat'], countryRow)
      if (!faoStat) return result
      const lastRecordedYear = R.pipe(
        R.keys,
        R.sort((a, b) => b-a),
        R.head
      )(faoStat)
      const yearsToRepeat = R.range(Number(lastRecordedYear)+1, 2021)
      const repeatValue = R.path([lastRecordedYear, 'area'], faoStat)
      const repeatedPairs = R.map(year => [year+'', {area: repeatValue, estimate: true, repeated: true}], yearsToRepeat)
      const faoStatWithRepeatedValues = R.merge(R.fromPairs(repeatedPairs), faoStat)
      return R.assocPath([iso, 'faoStat'], faoStatWithRepeatedValues, result)
    },
    faostatData,
    R.toPairs(faostatData)
  )
}

const update = async (faoStatCsvFile, outputFile) => {
  try {
    const faostatData = await faoStat.getFaostatValues(faoStatCsvFile)
    const faoStatWithRepeatedYearsInTheFuture = addFaostatValuesForYearsUntil2020(faostatData)
    const merged = R.mergeDeepLeft(faoStatWithRepeatedYearsInTheFuture, countryConfig)
    fs.writeFileSync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')
    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')
  } catch (e) { console.log(e) }
}

update(faoStatCsvFile, outputFile)

