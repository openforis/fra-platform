/*
 * To create table definition (CREATE TABLE... clause) use repl to call createTableDefinition like this:
 *
 * ~/<project-home>$ node
 * > var sqlCreator = require('./server/fraTable/fraTableSqlCreator')
 * > sqlCreator.createTableDefinition('specificForestCategories', 'NUMERIC')
 *
 * -> CREATE TABLE specific_forest_categories (country_iso VARCHAR, row_name VARCHAR, 1990 NUMERIC, 2000 NUMERIC);'
 */

const R = require('ramda')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const fixedFraTableColumns = ['country_iso', 'row_name']
const fixedFraTableColumnDataTypes = ['VARCHAR', 'VARCHAR']

const createInsert = (tableName, columnNamesStr, valuePlaceholdersStr, row) =>
  [`INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`, row]

const createColumnNames = (mapping) => R.map((columnName) => `"${columnName}"`,[...fixedFraTableColumns, ...mapping.mapping.columns.names])

const createRowData = (countryIso, mapping, rowIndex, rawRow) => {
  const trimmed = R.drop(mapping.mapping.columns.indexOffset, rawRow)
  //These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...trimmed]
}

const getMapping = (tableSpecName) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  console.log(mapping)
  return mapping
}

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
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

// Currently assumes all dynamic columns are of the same type (might have to change that later)
const createTableDefinition = (tableSpecName, columnDataType) => {
  const mapping = getMapping(tableSpecName)
  const columnNames = createColumnNames(mapping)
  const dynamicDataDataTypeArray = R.map(()=> columnDataType, mapping.mapping.columns.names)
  const dataTypes = [...fixedFraTableColumnDataTypes, ...dynamicDataDataTypeArray]
  assert(dataTypes.length === columnNames.length, 'Data types and column names arrays should be of the same length! Check your mapping')
  const columns = R.zip(columnNames, dataTypes)
  const columnsStr = R.join(', ', R.map(([name, dataType]) => `${name} ${dataType}`, columns))
  return `CREATE TABLE ${mapping.mapping.tableName} (${columnsStr}, PRIMARY KEY (country_iso, row_name));`
}

const createDelete = (countryIso, tableSpecName) => {
  const mapping = getMapping(tableSpecName)
  return [`DELETE FROM ${mapping.mapping.tableName} WHERE country_iso = $1;`, [countryIso]]
}

module.exports.createInserts = createInserts
module.exports.createTableDefinition = createTableDefinition
module.exports.createDelete = createDelete
