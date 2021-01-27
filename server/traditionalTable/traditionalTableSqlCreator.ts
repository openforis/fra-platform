// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assert')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tableMappi... Remove this comment to see the full error message
const tableMappings = require('./tableMappings')

const fixedFraTableColumns = [
  { name: 'country_iso', type: 'varchar(3) REFERENCES country(country_iso) NOT NULL' },
  { name: 'row_name', type: 'text' },
]

const columnNames = (columns: any) => R.pluck('name', columns)

const createInsert = (tableName: any, columnNamesStr: any, valuePlaceholdersStr: any, row: any) => [
  `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`,
  row,
]

const createColumnNames = (mapping: any) =>
  R.map((columnName: any) => `"${columnName}"`, [...columnNames(fixedFraTableColumns), ...columnNames(mapping.columns)])

const createRowData = (countryIso: any, mapping: any, rowIndex: any, rawRow: any) => {
  // These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...rawRow]
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getMapping... Remove this comment to see the full error message
const getMapping = (tableSpecName: any) => tableMappings.getMapping(tableSpecName)

const createSelect = (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const mapping = getMapping(tableSpecName)
  return [
    `SELECT ${createColumnNames(mapping)} FROM ${schemaName}.${mapping.tableName} WHERE country_iso = $1`,
    [countryIso],
  ]
}

const createDelete = (countryIso: any, tableSpecName: any) => {
  const mapping = getMapping(tableSpecName)
  return [`DELETE FROM ${mapping.tableName} WHERE country_iso = $1;`, [countryIso]]
}

const createInserts = (countryIso: any, tableSpecName: any, tableData: any) => {
  const mapping = getMapping(tableSpecName)
  assert(mapping, `Could not find mapping for ${tableSpecName}`)
  const tableSpecificColumnCount = tableData[0].length
  const columnNames = createColumnNames(mapping)
  const { tableName } = mapping
  const columnNamesStr = R.join(',', columnNames)
  const valuePlaceholdersStr = R.join(
    ',',
    R.map((idx: any) => `$${idx + 1}`, R.range(0, tableSpecificColumnCount + fixedFraTableColumns.length))
  )
  return R.addIndex(R.map)(
    (row: any, rowIndex: any) =>
      createInsert(tableName, columnNamesStr, valuePlaceholdersStr, createRowData(countryIso, mapping, rowIndex, row)),
    tableData
  )
}

// Currently assumes all dynamic columns are of the same type (might have to change that later)
const createTableDefinition = (tableSpecName: any) => {
  const mapping = getMapping(tableSpecName)
  const columnNames = createColumnNames(mapping)
  const dataTypes = [...R.pluck('type', fixedFraTableColumns), ...R.pluck('type', mapping.columns)]
  assert(
    dataTypes.length === columnNames.length,
    'Data types and column names arrays should be of the same length! Check your mapping'
  )
  const columns = R.zip(columnNames, dataTypes)
  const columnsStr = R.join(
    ',\n',
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
    R.map(([name, dataType]) => `${name} ${dataType}`, columns)
  )
  return `CREATE TABLE ${mapping.tableName} (\n${columnsStr}, \nPRIMARY KEY (country_iso, row_name));`
}

module.exports.createInserts = createInserts
module.exports.createTableDefinition = createTableDefinition
module.exports.createDelete = createDelete
module.exports.createSelect = createSelect
module.exports.fixedFraTableColumns = fixedFraTableColumns
