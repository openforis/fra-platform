const R = require('ramda')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const createInsert = (tableName, columnNamesStr, valuePlaceholdersStr, row) => [`INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`, row]

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  console.log(mapping)
  const columnCount = tableData[0].length - mapping.mapping.columns.indexOffset
  const columnNames = mapping.mapping.columns.names
  const tableName = mapping.mapping.tableName
  const columnNamesStr = R.join(',', columnNames)
  const valuePlaceholdersStr = R.join(',', R.map((idx) => `$${idx+1}`, R.range(0, columnCount)))
  return R.map((row) => createInsert(tableName, columnNamesStr, valuePlaceholdersStr, R.drop(mapping.mapping.columns.indexOffset, row)), R.drop(mapping.mapping.rows.indexOffset, tableData))
}

module.exports.createInserts = createInserts
