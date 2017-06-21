const db = require('../db/db')
const R = require('ramda')
const sqlCreator = require('./fraTableSqlCreator')

module.exports.save = (client, countryIso, tableSpecName, tableState) => {
  console.log('fraTableRepository.save', countryIso, tableSpecName, tableState)
  const insertQueries = sqlCreator.createInserts(countryIso, tableSpecName, tableState.tableState)
  console.log(insertQueries)
  return Promise.resolve()
}
