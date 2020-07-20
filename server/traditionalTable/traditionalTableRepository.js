const db = require('../db/db')
const R = require('ramda')
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')
const sqlCreator = require('./traditionalTableSqlCreator')
const tableMappings = require('./tableMappings')
const auditRepository = require('./../audit/auditRepository')
const camelize = require('camelize')

module.exports.save = async (client, user, countryIso, tableSpecName, tableData) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  const section = mapping.section ? mapping.section : tableSpecName

  await allowedToEditDataCheck(countryIso, user, section)

  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  await auditRepository.insertAudit(client, user.id, 'saveTraditionalTable', countryIso, section)
  const insertQueries = sqlCreator.createInserts(countryIso, tableSpecName, tableData)

  await client.query(deleteQuery, deleteQyeryParams)
  for (const [queryString, params] of insertQueries) {
    await client.query(queryString, params)
  }
}

const createTableData = (cols, rows) =>
  R.map(
    (rowIdx) => new Array(cols),
    R.range(0, rows))

const update = (mapping, tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

const handleRow = mapping => (tableData, row) => {
  const values = R.omit(R.pluck('name', sqlCreator.fixedFraTableColumns), row)
  const rowIdx = mapping.getRowIndex(row.row_name)
  return R.reduce(
    (tableDataAccu, [column, fieldValue]) => update(mapping, tableDataAccu, rowIdx, mapping.getColumnIndex(column), fieldValue),
    tableData,
    R.toPairs(values)
  )
}

const rawRead = async (countryIso, tableSpecName, schemaName = 'public') => {
  const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableSpecName, schemaName)
  const result = await db.query(selectQuery, selectParams)
  if (result.rowCount === 0) return []
  return result.rows
}

module.exports.read = async (countryIso, tableSpecName, schemaName = 'public') => {
  const rows = await rawRead(countryIso, tableSpecName, schemaName)
  // if (rows === null) return null
  const mapping = tableMappings.getMapping(tableSpecName)
  const emptyTableData = createTableData(
    mapping.getFullColumnCount(),
    mapping.getFullRowCount()
  )
  return R.reduce(handleRow(mapping), emptyTableData, rows)
}

// Read an object instead of the matrix that plain read returns.
// This can be used when you need programmatical access to the data
// outside of the automated traditionalTable FW (in other views or calculations)
module.exports.readObject = async (countryIso, tableSpecName, schemaName = 'public') => {
  const rows = await rawRead(countryIso, tableSpecName, schemaName)
  if (rows === null) return null
  return R.pipe(
    R.values,
    R.map(row => [row.row_name, R.dissoc('row_name', row)]),
    R.fromPairs,
    camelize
  )(rows)
}
