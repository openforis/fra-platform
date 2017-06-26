const db = require('../db/db')
const R = require('ramda')
const sqlCreator = require('./fraTableSqlCreator')

module.exports.save = (client, countryIso, tableSpecName, tableState) => {
  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  const insertQueries = sqlCreator.createInserts(countryIso, tableSpecName, tableState.tableState)

  return client.query(
    deleteQuery, deleteQyeryParams
  ).then(() =>
    Promise.all(R.map(
      ([queryString, params]) => client.query(queryString, params),
      insertQueries))
  )
}
