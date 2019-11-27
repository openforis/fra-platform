import R from 'ramda'
import * as cellTypes from './cellTypes'

export const createTableData = (tableSpec) =>
  R.map(
    (rowIdx) => new Array(tableSpec.rows[0].length),
    R.range(0, tableSpec.rows.length))

const update = (tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

export const updateCellValue = (tableSpec, tableValues, rowIdx, colIdx, newValue) => {
  const currentValue = tableValues[rowIdx][colIdx]
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  const sanitizedNewValue = cellType.acceptValue(newValue, currentValue)
  return update(tableValues, rowIdx, colIdx, sanitizedNewValue)
}

export const fillTableDataStartingFromCell = (startRowIdx, startColIdx, tableSpec, tableData, newData) => {
  return R.reduce((tableData, {rowIdx, colIdx, cellData}) => {
    const rowIdxToUpdate = startRowIdx + rowIdx
    const colIdxToUpdate = startColIdx + colIdx
    if (rowIdxToUpdate > tableSpec.rows.length - 1 ||
      colIdxToUpdate > tableSpec.rows[0].length - 1) return tableData
    const cellType = cellTypes.getCellType(tableSpec, rowIdxToUpdate, colIdxToUpdate)
    if (!cellType.acceptValue) return tableData
    return update(
      tableData,
      rowIdxToUpdate,
      colIdxToUpdate,
      cellType.acceptValue(cellData, tableData[rowIdxToUpdate][colIdxToUpdate])
    )
  }, tableData, newData)
}

const fillTableData = ({ valueSlice = {} }, fullTableData, valueSliceData = []) => {
  const {
    columnEnd,
    columnStart = 0,
  } = valueSlice

  return [...fullTableData].map((row, i) => {
    const start = row.slice(0, columnStart)
    const mid = valueSliceData[i] ? valueSliceData[i] : []
    const end = columnEnd ? row.slice(columnEnd) : []

    const arr = [...start, ...mid , ...end]
    return arr
  })
}

export const fillTableDatafromValueSlice = (tableSpec, fullTableData, valueSliceData) => {
  return fillTableData(tableSpec, fullTableData, valueSliceData);
}



const getSlice = ({ valueSlice = {} }, table) => {
  const {
    columnEnd,
    columnStart,
    rowEnd,
    rowStart
  } = valueSlice

  return table.slice(rowStart, rowEnd).map(i => i.slice(columnStart, columnEnd) )
}

export const getValueSliceFromTableData = (tableSpec, tableValues) => {
  return getSlice(tableSpec, tableValues)
}
