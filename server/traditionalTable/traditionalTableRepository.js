const db = require('../db/db')
const R = require('ramda')
const sqlCreator = require('./traditionalTableSqlCreator')
const tableMappings = require('./tableMappings')
const auditRepository = require('./../audit/auditRepository')
const { toNumberOrNull  } = require('../utils/databaseConversions')

module.exports.save = (client, userId, countryIso, tableSpecName, tableData) => {
  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  const insertQueries = sqlCreator.createInserts(countryIso, tableSpecName, tableData)
  const insertAudit = auditRepository.insertAudit(client, userId, 'saveTraditionalTable', countryIso, tableSpecName)

  return insertAudit.then(() => client.query(
    deleteQuery, deleteQyeryParams
  ).then(() =>
    Promise.all(R.map(
      ([queryString, params]) => client.query(queryString, params),
      insertQueries))
  ))
}

const createTableData = (cols, rows) =>
  R.map(
    (rowIdx) => new Array(cols),
    R.range(0, rows))

const convertValueFromDb = (colIdx, value, mapping) => {
  const type = mapping.getColumn(colIdx).type
  switch (type) {
    case 'numeric': // Just in case, support both cases
    case 'NUMERIC':
      return toNumberOrNull(value)
    default:
      return value
  }
}

const update = (mapping, tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, convertValueFromDb(colIdx, newValue, mapping), tableValues[rowIdx]), tableValues)

const handleRow = mapping => (tableData, row) => {
  const values = R.omit(R.pluck('name', sqlCreator.fixedFraTableColumns), row)
  const rowIdx = mapping.getRowIndex(row.row_name)
  return R.reduce(
    (tableDataAccu, [column, fieldValue]) => console.log('column', column) || update(mapping, tableDataAccu, rowIdx, mapping.getColumnIndex(column), fieldValue),
    tableData,
    R.toPairs(values)
  )
}

module.exports.read = (countryIso, tableSpecName) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableSpecName)
  return db.query(selectQuery, selectParams).then((result) => {
    if (result.rowCount === 0) return null
    const emptyTableData = createTableData(
      mapping.getFullColumnCount(),
      mapping.getFullRowCount()
    )
    return R.reduce(handleRow(mapping), emptyTableData, result.rows)
  })
}
