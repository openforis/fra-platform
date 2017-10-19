const R = require('ramda')
const faoStat = require('./faoStat')
const domainMapping = require('../server/biomassStock/countriesDomainMapping')

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the faostat csv file> <path of the output file>`)
  process.exit()
}

const fileName  = process.argv[2]
console.log('reading file', fileName)

const domains = R.reduce(
  (result, row) => R.assocPath([row.countryIso, 'domain'], row.domain, result),
  {},
  domainMapping
)

const handleFaoStatValues = faoStatValues => {
  const merged = R.mergeDeepLeft(faoStatValues, domains)
  console.log(merged)
}

faoStat.getFaostatValues(fileName)
  .then(handleFaoStatValues)
  .catch(err => console.log('Error: ', err))

