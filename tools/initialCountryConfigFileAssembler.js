import * as R from 'ramda'
import * as faoStat from './faoStat'
import * as domainMapping from '../server/biomassStock/countriesDomainMapping'
import * as fs from 'fs'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the faostat csv file> <path of the output file>`)
  process.exit()
}

const faoStatCsvFile = process.argv[2]
console.log('reading file', faoStatCsvFile)
const outputFile = process.argv[3]

const domains = R.reduce(
  (result, row) => R.assocPath([row.countryIso, 'domain'], row.domain, result),
  {},
  domainMapping
)

const handleFaoStatValues = faoStatValues => {
  const merged = R.mergeDeepLeft(faoStatValues, domains)
  fs.writeFileSync(outputFile, JSON.stringify(merged), 'utf8')
  console.log('Wrote merged faostat and domain mappings to', outputFile)
}

faoStat.getFaostatValues(faoStatCsvFile)
  .then(handleFaoStatValues)
  .catch(err => console.log('Error: ', err))

