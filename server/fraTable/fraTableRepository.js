const db = require('../db/db')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  console.log(mapping)
}

module.exports.save = (client, countryIso, tableSpecName, tableData) => {
  console.log('fraTableRepository.save', countryIso, tableSpecName, tableData)
  const insertQueries = createInserts(countryIso, tableSpecName, tableData)
  console.log(insertQueries)
  return Promise.resolve()
}
