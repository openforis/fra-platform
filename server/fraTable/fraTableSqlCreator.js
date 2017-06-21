const R = require('ramda')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const fixedFraTableColumns = ['country_iso', 'row_name']

const createInsert = (tableName, columnNamesStr, valuePlaceholdersStr, row) =>
  [`INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`, row]

const createColumnNames = (mapping) => [...fixedFraTableColumns, ...mapping.mapping.columns.names]

const createRowData = (countryIso, mapping, rowIndex, rawRow) => {
  const trimmed = R.drop(mapping.mapping.columns.indexOffset, rawRow)
  //These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...trimmed]
}

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  console.log(mapping)
  const tableSpecificColumnCount = tableData[0].length - mapping.mapping.columns.indexOffset
  const columnNames = createColumnNames(mapping)
  const tableName = mapping.mapping.tableName
  const columnNamesStr = R.join(',', columnNames)
  const valuePlaceholdersStr = R.join(',', R.map((idx) => `$${idx+1}`, R.range(0, tableSpecificColumnCount + fixedFraTableColumns.length)))
  const trimmedTableRows = R.drop(mapping.mapping.rows.indexOffset, tableData)
  return R.addIndex(R.map)((row, rowIndex) => createInsert(
    tableName,
    columnNamesStr,
    valuePlaceholdersStr,
    createRowData(countryIso, mapping, rowIndex, row)),
    trimmedTableRows)
}

module.exports.createInserts = createInserts
