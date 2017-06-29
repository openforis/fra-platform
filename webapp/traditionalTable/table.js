import R from 'ramda'
import * as L from "partial.lenses"

export const createTableData = (tableSpec) =>
  R.map(
    (rowIdx) => new Array(tableSpec.rows[0].length),
    R.range(0, tableSpec.rows.length))

export const fillTableDatafromValueSlice = (tableSpec, fullTableData, valueSliceData) => {
  const valueSlice = tableSpec.valueSlice || {} //Lenses work with undefined as default values nicely
  const rowSliceLens = L.slice(valueSlice.rowStart, valueSlice.rowEnd)
  const colSliceLens = L.slice(valueSlice.columnStart, valueSlice.columnEnd)
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

export const update = (tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

export const getValueSliceFromTableValues = (tableSpec, tableValues) => {
  const valueSlice = tableSpec.valueSlice || {} //Lenses work with undefined as default values nicely
  const rowSliceLens = L.slice(valueSlice.rowStart, valueSlice.rowEnd)
  const colSliceLens = L.slice(valueSlice.columnStart, valueSlice.columnEnd)
  return L.collect([rowSliceLens, L.elems, colSliceLens], tableValues)
}
