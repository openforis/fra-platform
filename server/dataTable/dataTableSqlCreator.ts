import * as R from 'ramda'
import * as assert from 'assert'
import * as tableMappings from './tableMappings'

export const fixedFraTableColumns = [
  { name: 'country_iso', type: 'varchar(3) REFERENCES country(country_iso) NOT NULL' },
  { name: 'row_name', type: 'text' },
]

// @ts-ignore
export const columnNames = (columns: any) => R.pluck('name', columns)

export const createInsert = (tableName: any, columnNamesStr: any, valuePlaceholdersStr: any, row: any) => [
  `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${valuePlaceholdersStr})`,
  row,
]

export const createColumnNames = (mapping: any) =>
  R.map((columnName: any) => `"${columnName}"`, [...columnNames(fixedFraTableColumns), ...columnNames(mapping.columns)])

export const createRowData = (countryIso: any, mapping: any, rowIndex: any, rawRow: any) => {
  // These values are there for all fra tables
  const fixedValues = [countryIso, mapping.getRowName(rowIndex)]
  return [...fixedValues, ...rawRow]
}

export function getMapping(tableSpecName: any): { [key: string]: any } {
  return tableMappings.getMapping(tableSpecName)
}

export const createSelect = (countryIso: any, tableSpecName: any, schemaName = 'public'): [string, string[]] => {
  const mapping = getMapping(tableSpecName)
  return [
    `SELECT ${createColumnNames(mapping)} FROM ${schemaName}.${mapping.tableName} WHERE country_iso = $1`,
    [countryIso],
  ]
}

export const createDelete = (countryIso: any, tableSpecName: any): [string, string[]] => {
  const mapping = getMapping(tableSpecName)
  return [`DELETE FROM ${mapping.tableName} WHERE country_iso = $1;`, [countryIso]]
}

export const createInserts = (countryIso: string, tableSpecName: string, tableData: any) => {
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
export const createTableDefinition = (tableSpecName: any) => {
  const mapping = getMapping(tableSpecName)
  const columnNames = createColumnNames(mapping)
  // @ts-ignore
  const dataTypes = [...R.pluck('type', fixedFraTableColumns), ...R.pluck('type', mapping.columns)]
  assert(
    dataTypes.length === columnNames.length,
    'Data types and column names arrays should be of the same length! Check your mapping'
  )
  const columns = R.zip(columnNames, dataTypes)
  const columnsStr = R.join(
    ',\n',
    R.map(([name, dataType]) => `${name} ${dataType}`, columns)
  )
  return `CREATE TABLE ${mapping.tableName} (\n${columnsStr}, \nPRIMARY KEY (country_iso, row_name));`
}
