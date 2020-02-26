const R = require('ramda')
const tableMappings = require('./tableMappings')
const assert = require('assert')

const fixedFraTableColumns = [
  {name: 'country_iso', type: 'varchar(3) REFERENCES country(country_iso) NOT NULL'},
  {name: 'row_name', type: 'text'}
]

const columnNames = (columns) => R.pluck('name', columns)

const createInsert = (tableName, columnNamesStr, valuePlaceholdersStr, row) =>
  [`INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`, row]

const createColumnNames = (mapping) =>
  R.map(
    (columnName) => `"${columnName}"`,
    [...columnNames(fixedFraTableColumns), ...columnNames(mapping.columns)])

const createRowData = (countryIso, mapping, rowIndex, rawRow) => {
  //These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...rawRow]
}

const getMapping = (tableSpecName) => tableMappings.getMapping(tableSpecName)

const createSelect = (countryIso, tableSpecName, schemaName = 'public') => {
  const mapping = getMapping(tableSpecName)
  return [`SELECT ${createColumnNames(mapping)} FROM ${schemaName}.${mapping.tableName} WHERE country_iso = $1`, [countryIso]]
}

const createDelete = (countryIso, tableSpecName) => {
  const mapping = getMapping(tableSpecName)
  return [`DELETE FROM ${mapping.tableName} WHERE country_iso = $1;`, [countryIso]]
}

const createInserts = (countryIso, tableSpecName, tableData) => {
  const mapping = getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  const tableSpecificColumnCount = tableData[0].length
  const columnNames = createColumnNames(mapping)
  const tableName = mapping.tableName
  const columnNamesStr = R.join(',', columnNames)
  const valuePlaceholdersStr = R.join(',', R.map((idx) => `$${idx+1}`, R.range(0, tableSpecificColumnCount + fixedFraTableColumns.length)))
  return R.addIndex(R.map)((row, rowIndex) => createInsert(
    tableName,
    columnNamesStr,
    valuePlaceholdersStr,
    createRowData(countryIso, mapping, rowIndex, row)),
    tableData)
}

// Currently assumes all dynamic columns are of the same type (might have to change that later)
const createTableDefinition = (tableSpecName) => {
  const mapping = getMapping(tableSpecName)
  const columnNames = createColumnNames(mapping)
  const dataTypes = [...R.pluck('type', fixedFraTableColumns), ...R.pluck('type', mapping.columns)]
  assert(dataTypes.length === columnNames.length, 'Data types and column names arrays should be of the same length! Check your mapping')
  const columns = R.zip(columnNames, dataTypes)
  const columnsStr = R.join(',\n', R.map(([name, dataType]) => `${name} ${dataType}`, columns))
  return `CREATE TABLE ${mapping.tableName} (\n${columnsStr}, \nPRIMARY KEY (country_iso, row_name));`
}

module.exports.createInserts = createInserts
module.exports.createTableDefinition = createTableDefinition
module.exports.createDelete = createDelete
module.exports.createSelect = createSelect
module.exports.fixedFraTableColumns = fixedFraTableColumns
