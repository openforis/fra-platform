import { ODPs } from 'meta/assessment/odps'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Arrays } from 'utils/arrays'
import { Objects } from 'utils/objects'

import { Sanitizer } from 'client/utils/sanitizer'

const handlePaste = (
  columns: Array<{ name: string; type: string; precision?: number }>,
  allowedClass: (nationalClass: ODPNationalClass) => boolean,
  odp: OriginalDataPoint,
  allowGrow: boolean,
  rawPastedData: Array<Array<string>>,
  rowIndex: number,
  colIndex: number
): { updatedOdp: OriginalDataPoint; firstPastedCellData: string } => {
  const sanitizerFor = (type: string): ((newValue: string, _oldValue: string, _precision?: number) => string) => {
    let sanitizer = (newValue: string, _oldValue: string, _precision?: number): string => newValue
    if (type === 'decimal') sanitizer = Sanitizer.acceptNextDecimal
    if (type === 'integer') sanitizer = Sanitizer.acceptNextInteger
    return sanitizer
  }

  const updateOdp = (odp: OriginalDataPoint, rowNo: number, colNo: number, rawValue: string): OriginalDataPoint => {
    if (Objects.isNil(columns[colNo])) return odp
    const { precision } = columns[colNo]
    const value = sanitizerFor(columns[colNo].type)(rawValue, null, precision)
    const fieldName = columns[colNo].name as keyof ODPNationalClass
    return ODPs.updateNationalClass({ odp, index: rowNo, field: fieldName, value })
  }

  const allowedClasses = odp.nationalClasses
    .map((nc, rowIndex) => ({ ...nc, rowIndex }))
    .filter((nc) => allowedClass(nc))

  const rowCount = allowedClasses.length

  const allowedIndexes = allowGrow
    ? Arrays.range(0, Math.max(rawPastedData.length, allowedClasses.length + 1))
    : allowedClasses.map((nc) => nc.rowIndex)

  const rowOffset = allowedIndexes.findIndex((idx) => idx === rowIndex)

  const pastedData: Array<Array<string>> = allowGrow ? rawPastedData : rawPastedData.slice(0, rowCount - rowOffset)
  const handleRow = (pastedRowIndex: number, pastedRow: Array<string>, odp: OriginalDataPoint): OriginalDataPoint =>
    pastedRow.reduce<{ odp: OriginalDataPoint; colIndex: number }>(
      (acc, pastedColumnValue) => ({
        odp: updateOdp(acc.odp, allowedIndexes[pastedRowIndex] + rowOffset, acc.colIndex + colIndex, pastedColumnValue),
        colIndex: acc.colIndex + 1,
      }),
      { odp, colIndex: 0 }
    ).odp

  const updatedOdp: OriginalDataPoint = pastedData.reduce<{ odp: OriginalDataPoint; pastedRowIndex: number }>(
    (acc, pastedRow) => ({
      odp: handleRow(acc.pastedRowIndex, pastedRow, acc.odp),
      pastedRowIndex: acc.pastedRowIndex + 1,
    }),
    { odp, pastedRowIndex: 0 }
  ).odp

  // @ts-ignore
  const firstPastedCellData = sanitizerFor(columns[colIndex].type)(pastedData[0][0])

  return { updatedOdp, firstPastedCellData }
}
export default handlePaste
