const R = require('ramda')
const csv = require('csv')
const faoStat = require('./faoStat')
const countryConfig = require('../common/countryConfig')
const fs = require('fs')

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the faostat csv file> <path of the output file>`)
  process.exit()
}

const faoStatCsvFile = process.argv[2]
console.log('reading file', faoStatCsvFile)
const outputFile = process.argv[3]

const update = async (faoStatCsvFile, outputFile) => {
  try {
    const faostatData = await faoStat.getFaostatValues(faoStatCsvFile)
    const merged = R.mergeDeepLeft(faostatData, countryConfig)
    fs.writeFileSync(outputFile, JSON.stringify(merged), 'utf8')
    console.log('Wrote merged values into: ', outputFile)
  } catch (e) { console.log(e) }
}

update(faoStatCsvFile, outputFile)
