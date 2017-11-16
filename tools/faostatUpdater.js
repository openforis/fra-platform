const R = require('ramda')
const csv = require('csv')
const faoStat = require('./faoStat')
const fs = require('fs')

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the faostat csv file> <path of the output file>`)
  process.exit()
}

const faoStatCsvFile = process.argv[2]
console.log('reading file', faoStatCsvFile)
const outputFile = process.argv[3]

const handleFaoStatValues = faoStatValues => {
  const merged = R.mergeDeepLeft(faoStatValues, domains)
  fs.writeFileSync(outputFile, JSON.stringify(merged), 'utf8')
  console.log('Wrote merged faostat and domain mappings to', outputFile)
}

const update = async (faoStatCsvFile, outputFile) => {
  try {
    const faostatData = await faoStat.getFaostatValues(faoStatCsvFile)
    console.log('faostat data:')
    console.log(faostatData)
  } catch (e) { console.log(e) }
}

update(faoStatCsvFile, outputFile)
