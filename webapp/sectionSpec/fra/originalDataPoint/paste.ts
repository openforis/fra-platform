import * as R from 'ramda'
import { acceptNextDecimal, acceptNextInteger } from '@webapp/utils/numberInput'
import { ODP } from '@core/odp'
import * as originalDataPoint from './originalDataPoint'

const mapIndexed = R.addIndex(R.map)

export default (
  columns: any,
  allowedClass: any,
  odp: ODP,
  allowGrow: any,
  rawPastedData: any,
  rowIndex: any,
  colIndex: any
) => {
  const sanitizerFor = (type: any) =>
    type === 'decimal' ? acceptNextDecimal : type === 'integer' ? acceptNextInteger : R.identity

  const updateOdp = (odp: any, rowNo: any, colNo: any, rawValue: any) => {
    if (R.isNil(columns[colNo])) return odp
    const value = sanitizerFor(columns[colNo].type)(rawValue, null)
    const fieldName = columns[colNo].name
    return originalDataPoint.updateNationalClass(odp, rowNo, fieldName, value)
  }

  const allowedClasses = R.filter(
    (nc: any) => !nc.placeHolder && allowedClass(nc),
    mapIndexed((nc: any, i: any) => ({ ...nc, rowIndex: i }), odp.nationalClasses)
  )

  const rowCount = allowedClasses.length

  const allowedIndexes = allowGrow
    ? R.range(0, R.max(rawPastedData.length, allowedClasses.length + 1))
    : R.pluck('rowIndex', allowedClasses)

  const rowOffset = R.findIndex((i: any) => i === rowIndex, allowedIndexes)

  const pastedData = allowGrow ? rawPastedData : R.take(rowCount - rowOffset, rawPastedData)

  const handleRow = (pastedRowIndex: any, pastedRow: any, odp: any) =>
    R.reduce(
      (accu: any, pastedColumnValue: any) => ({
        odp: updateOdp(
          accu.odp,
          allowedIndexes[pastedRowIndex] + rowOffset,
          accu.colIndex + colIndex,
          pastedColumnValue
        ),
        colIndex: accu.colIndex + 1,
      }),
      { odp, colIndex: 0 },
      pastedRow
    ).odp

  const updatedOdp = R.reduce(
    (accu: any, pastedRow: any) => ({
      odp: handleRow(accu.pastedRowIndex, pastedRow, accu.odp),
      pastedRowIndex: accu.pastedRowIndex + 1,
    }),
    { odp, pastedRowIndex: 0 },
    pastedData
  ).odp

  // @ts-ignore
  const firstPastedCellData = sanitizerFor(columns[colIndex].type)(pastedData[0][0])

  return { updatedOdp, firstPastedCellData }
}
