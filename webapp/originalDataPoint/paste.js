import * as R from 'ramda'
import { acceptNextInteger, acceptNextDecimal } from '../utils/numberInput'
import * as originalDataPoint from './originalDataPoint'

const mapIndexed = R.addIndex(R.map)

export default (columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex) => {
  const sanitizerFor = type =>
    type === 'decimal'
      ? acceptNextDecimal
      : type === 'integer' ? acceptNextInteger : R.identity

  const updateOdp = (odp, rowNo, colNo, rawValue) => {
    if (R.isNil(columns[colNo])) return odp
    const value = sanitizerFor(columns[colNo].type)(rawValue, null)
    const fieldName = columns[colNo].name
    return originalDataPoint.updateNationalClass(odp, rowNo, fieldName, value)
  }

  const allowedClasses = R.filter(
    nc => !nc.placeHolder && allowedClass(nc),
    mapIndexed((nc, i) => ({...nc, rowIndex: i}), odp.nationalClasses)
  )

  const rowCount = allowedClasses.length

  const allowedIndexes = allowGrow
    ? R.range(0, R.max(rawPastedData.length, allowedClasses.length + 1))
    : R.pluck('rowIndex', allowedClasses)

  const rowOffset = R.findIndex(i => i === rowIndex, allowedIndexes)

  const pastedData = allowGrow
    ? rawPastedData
    : R.take(rowCount - rowOffset, rawPastedData)

  const handleRow = (pastedRowIndex, pastedRow, odp) =>
    R.reduce(
      (accu, pastedColumnValue) =>
        ({
          odp: updateOdp(accu.odp, allowedIndexes[pastedRowIndex] + rowOffset, accu.colIndex + colIndex, pastedColumnValue),
          colIndex: accu.colIndex + 1
        }),
      {odp: odp, colIndex: 0},
      pastedRow).odp

  const updatedOdp =
    R.reduce(
      (accu, pastedRow) =>
        ({odp: handleRow(accu.pastedRowIndex, pastedRow, accu.odp), pastedRowIndex: accu.pastedRowIndex + 1}),
      {odp: odp, pastedRowIndex: 0},
      pastedData
    ).odp

  const firstPastedCellData = sanitizerFor(columns[colIndex].type)(pastedData[0][0])

  return {updatedOdp, firstPastedCellData}
}
