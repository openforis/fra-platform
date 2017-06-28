const db = require('../db/db')
const R = require('ramda')
const sqlCreator = require('./traditionalTableSqlCreator')
const tableMappings = require('./tableMappings')
const { toNumberOrNull  } = require('../utils/databaseConversions')

module.exports.save = (client, countryIso, tableSpecName, tableState) => {
  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  const insertQueries = sqlCreator.createInserts(countryIso, tableSpecName, tableState.tableState)

  return client.query(
    deleteQuery, deleteQyeryParams
  ).then(() =>
    Promise.all(R.map(
      ([queryString, params]) => client.query(queryString, params),
      insertQueries))
  )
}

const createTableData = (cols, rows) =>
  R.map(
    (rowIdx) => new Array(cols),
    R.range(0, rows))

// Now assumes that values are numbers, we might have to add types to
// mapping later in addition to row and column names
const update = (tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, toNumberOrNull(newValue), tableValues[rowIdx]), tableValues)

const handleRow = mapping => (tableData, row) => {
  const values = R.omit(sqlCreator.fixedFraTableColumns, row)
  const rowIdx = mapping.getRowIndex(row.row_name)
  return R.reduce(
    (tableDataAccu, [column, fieldValue]) => update(tableDataAccu, rowIdx, mapping.getColumnIndex(column), fieldValue),
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
