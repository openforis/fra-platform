const R = require('ramda')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const fixedFraTableColumns = ['country_iso', 'row_name']
const fixedFraTableColumnDataTypes = ['VARCHAR', 'VARCHAR']

const createInsert = (tableName, columnNamesStr, valuePlaceholdersStr, row) =>
  [`INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`, row]

const createColumnNames = (mapping) => R.map((columnName) => `"${columnName}"`,[...fixedFraTableColumns, ...mapping.columns.names])

const createRowData = (countryIso, mapping, rowIndex, rawRow) => {
  const trimmed = R.drop(mapping.columns.indexOffset, rawRow)
  //These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...trimmed]
}

const getMapping = (tableSpecName) => tableMappings.getMapping(tableSpecName)

const createSelect = (countryIso, tableSpecName) => {
  const mapping = getMapping(tableSpecName)
  return [`SELECT ${createColumnNames(mapping)} FROM ${mapping.tableName} WHERE country_iso = $1`, [countryIso]]
}

const createDelete = (countryIso, tableSpecName) => {
  const mapping = getMapping(tableSpecName)
  return [`DELETE FROM ${mapping.tableName} WHERE country_iso = $1;`, [countryIso]]
}

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  const tableSpecificColumnCount = tableData[0].length - mapping.columns.indexOffset
  const columnNames = createColumnNames(mapping)
  const tableName = mapping.tableName
  const columnNamesStr = R.join(',', columnNames)
  const valuePlaceholdersStr = R.join(',', R.map((idx) => `$${idx+1}`, R.range(0, tableSpecificColumnCount + fixedFraTableColumns.length)))
  const trimmedTableRows = R.drop(mapping.rows.indexOffset, tableData)
  return R.addIndex(R.map)((row, rowIndex) => createInsert(
    tableName,
    columnNamesStr,
    valuePlaceholdersStr,
    createRowData(countryIso, mapping, rowIndex, row)),
    trimmedTableRows)
}

// Currently assumes all dynamic columns are of the same type (might have to change that later)
const createTableDefinition = (tableSpecName, columnDataType) => {
  const mapping = getMapping(tableSpecName)
  const columnNames = createColumnNames(mapping)
  const dynamicDataDataTypeArray = R.map(()=> columnDataType, mapping.columns.names)
  const dataTypes = [...fixedFraTableColumnDataTypes, ...dynamicDataDataTypeArray]
  assert(dataTypes.length === columnNames.length, 'Data types and column names arrays should be of the same length! Check your mapping')
  const columns = R.zip(columnNames, dataTypes)
  const columnsStr = R.join(', ', R.map(([name, dataType]) => `${name} ${dataType}`, columns))
  return `CREATE TABLE ${mapping.tableName} (${columnsStr}, PRIMARY KEY (country_iso, row_name));`
}

module.exports.createInserts = createInserts
module.exports.createTableDefinition = createTableDefinition
module.exports.createDelete = createDelete
module.exports.createSelect = createSelect
module.exports.fixedFraTableColumns = fixedFraTableColumns
