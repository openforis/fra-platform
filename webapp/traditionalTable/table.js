import R from 'ramda'
import * as L from "partial.lenses"

export const createTableData = (tableSpec) =>
  R.map(
    (rowIdx) => new Array(tableSpec.rows[0].length),
    R.range(0, tableSpec.rows.length))

export const update = (tableValues, rowIdx, colIdx, newValue) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

export const getValueSliceFromTableValues = (tableSpec, tableValues) => {
  const valueSlice = tableSpec.valueSlice || {} //Lenses work with undefined as default values nicely
  const rowSliceLens = L.slice(valueSlice.rowStart, valueSlice.rowEnd)
  const colSliceLens = L.slice(valueSlice.columnStart, valueSlice.columnEnd)
  return L.collect([rowSliceLens, L.elems, colSliceLens], tableValues)
}
