import R from 'ramda'
import * as L from "partial.lenses"
import * as cellTypes from './cellTypes'

export const createTableData = (tableSpec) =>
  R.map(
    (rowIdx) => new Array(tableSpec.rows[0].length),
    R.range(0, tableSpec.rows.length))

const getSliceLenses = (tableSpec) => {
  const valueSlice = tableSpec.valueSlice || {} //Lenses work with undefined as default values nicely
  return [
    L.slice(valueSlice.rowStart, valueSlice.rowEnd),
    L.slice(valueSlice.columnStart, valueSlice.columnEnd)
  ]
}

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
      startRowIdx + rowIdx,
      startColIdx + colIdx,
      cellType.acceptValue(cellData, tableData[rowIdxToUpdate][colIdxToUpdate])
    )
  }, tableData, newData)
}

export const fillTableDatafromValueSlice = (tableSpec, fullTableData, valueSliceData) => {
  const [rowSliceLens, colSliceLens] = getSliceLenses(tableSpec)
  const handleRow = (index, row, data) => {
    const rowLens = [rowSliceLens, L.index(index)]
    return L.set(rowLens, L.set(colSliceLens, row, L.get(rowLens, data)), data)
  }
  const reduceResult = R.reduce(
    (accu, row) => ({data: handleRow(accu.index, row, accu.data), index: accu.index + 1}),
    {index: 0, data: fullTableData},
    valueSliceData
  )
  return reduceResult.data
}

export const getValueSliceFromTableData = (tableSpec, tableValues) => {
  const [rowSliceLens, colSliceLens] = getSliceLenses(tableSpec)
  return L.collect([rowSliceLens, L.elems, colSliceLens], tableValues)
}
