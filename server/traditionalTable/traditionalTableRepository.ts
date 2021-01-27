// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'allowedToE... Remove this comment to see the full error message
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')
const sqlCreator = require('./traditionalTableSqlCreator')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tableMappi... Remove this comment to see the full error message
const tableMappings = require('./tableMappings')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')

module.exports.save = async (client: any, user: any, countryIso: any, tableSpecName: any, tableData: any) => {
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

const createTableData = (cols: any, rows: any) => R.map((rowIdx: any) => new Array(cols), R.range(0, rows))

const update = (mapping: any, tableValues: any, rowIdx: any, colIdx: any, newValue: any) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

const handleRow = (mapping: any) => (tableData: any, row: any) => {
  const values = R.omit(R.pluck('name', sqlCreator.fixedFraTableColumns), row)
  const rowIdx = mapping.getRowIndex(row.row_name)
  return R.reduce(
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'column' implicitly has an 'any' t... Remove this comment to see the full error message
    (tableDataAccu: any, [column, fieldValue]) =>
      update(mapping, tableDataAccu, rowIdx, mapping.getColumnIndex(column), fieldValue),
    tableData,
    R.toPairs(values)
  )
}

const rawRead = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableSpecName, schemaName)
  const result = await db.query(selectQuery, selectParams)
  if (result.rowCount === 0) return []
  return result.rows
}

module.exports.read = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const rows = await rawRead(countryIso, tableSpecName, schemaName)
  // if (rows === null) return null
  const mapping = tableMappings.getMapping(tableSpecName)
  const emptyTableData = createTableData(mapping.getFullColumnCount(), mapping.getFullRowCount())
  return R.reduce(handleRow(mapping), emptyTableData, rows)
}

// Read an object instead of the matrix that plain read returns.
// This can be used when you need programmatical access to the data
// outside of the automated traditionalTable FW (in other views or calculations)
module.exports.readObject = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const rows = await rawRead(countryIso, tableSpecName, schemaName)
  if (rows === null) return null
  return R.pipe(
    R.values,
    R.map((row: any) => [row.row_name, R.dissoc('row_name', row)]),
    R.fromPairs,
    camelize
  )(rows)
}
