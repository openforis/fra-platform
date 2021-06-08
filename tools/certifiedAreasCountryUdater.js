const R = require('ramda')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const csv = Promise.promisifyAll(require('csv'))
const countryConfig = require('../server/service/country/countryConfig')

const exampleUsage =
  'node certifiedAreasCountryUdater.js exampleData/Certification.csv /tmp/countryConfigWithCertifiedAreas.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the certification areas csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const inputCsvFile = process.argv[2]
console.log('reading file', inputCsvFile)
const outputFile = process.argv[3]

const countryIsoCol = 0

const getCertifiedAreas = async (fileName) => {
  const rawData = await fs.readFileAsync(fileName, { encoding: 'utf-8' })
  const parsedData = await csv.parseAsync(rawData)
  const data = R.slice(2, undefined, parsedData)

  const years = R.pipe(R.head, R.tail)(parsedData)
  //   R.pipe(
  //   R.slice(1, 2),
  //   R.head,
  //   R.slice(1, undefined),
  // )(parsedData)

  const getYearValues = (obj) => R.pipe((years) => years.map((y, i) => ({ [`${y}`]: obj[i + 1] })), R.mergeAll)(years)

  const rowObjects = R.pipe(
    R.map((row) => ({
      [`${row[countryIsoCol]}`]: {
        certifiedAreas: {
          ...getYearValues(row),
        },
      },
    })),
    R.mergeAll
  )(data)

  return rowObjects
}

const update = async (inputCsvFile, outputFile) => {
  try {
    const inputData = await getCertifiedAreas(inputCsvFile)
    const merged = R.mergeDeepLeft(inputData, countryConfig)
    fs.writeFileSync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')
    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')
  } catch (e) {
    console.log(e)
  }
}

update(inputCsvFile, outputFile)
