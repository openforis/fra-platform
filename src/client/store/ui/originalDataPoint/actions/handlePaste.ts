import { Arrays } from 'utils/arrays'
import { Objects } from 'utils/objects'

import { ODPNationalClass, ODPs, OriginalDataPoint } from 'meta/assessment'

import { Sanitizer } from 'client/utils/sanitizer'

const handlePaste = (
  columns: Array<{ name: string; type: string }>,
  allowedClass: (nationalClass: ODPNationalClass) => boolean,
  odp: OriginalDataPoint,
  allowGrow: boolean,
  rawPastedData: Array<Array<string>>,
  rowIndex: number,
  colIndex: number
): { updatedOdp: OriginalDataPoint; firstPastedCellData: string } => {
  const sanitizerFor = (type: string) => {
    let sanitizer = (newValue: string, _oldValue: string) => newValue
    if (type === 'decimal') sanitizer = Sanitizer.acceptNextDecimal
    if (type === 'integer') sanitizer = Sanitizer.acceptNextInteger
    return sanitizer
  }

  const updateOdp = (odp: OriginalDataPoint, rowNo: number, colNo: number, rawValue: string): OriginalDataPoint => {
    if (Objects.isNil(columns[colNo])) return odp
    const value = sanitizerFor(columns[colNo].type)(rawValue, null)
    const fieldName = columns[colNo].name as keyof ODPNationalClass
    return ODPs.updateNationalClass({ odp, index: rowNo, field: fieldName, value })
  }

  const allowedClasses = odp.nationalClasses
    .map((nc, rowIndex) => ({ ...nc, rowIndex }))
    .filter((nc) => !nc.placeHolder && allowedClass(nc))

  const rowCount = allowedClasses.length

  const allowedIndexes = allowGrow
    ? Arrays.range(0, Math.max(rawPastedData.length, allowedClasses.length + 1))
    : allowedClasses.map((nc) => nc.rowIndex)

  const rowOffset = allowedIndexes.findIndex((idx) => idx === rowIndex)

  const pastedData: Array<Array<string>> = allowGrow ? rawPastedData : rawPastedData.slice(0, rowCount - rowOffset)
  const handleRow = (pastedRowIndex: number, pastedRow: Array<string>, odp: OriginalDataPoint): OriginalDataPoint =>
    pastedRow.reduce<{ odp: OriginalDataPoint; colIndex: number }>(
      (accu, pastedColumnValue) => ({
        odp: updateOdp(
          accu.odp,
          allowedIndexes[pastedRowIndex] + rowOffset,
          accu.colIndex + colIndex,
          pastedColumnValue
        ),
        colIndex: accu.colIndex + 1,
      }),
      { odp, colIndex: 0 }
    ).odp

  const updatedOdp: OriginalDataPoint = pastedData.reduce<{ odp: OriginalDataPoint; pastedRowIndex: number }>(
    (accu, pastedRow) => ({
      odp: handleRow(accu.pastedRowIndex, pastedRow, accu.odp),
      pastedRowIndex: accu.pastedRowIndex + 1,
    }),
    { odp, pastedRowIndex: 0 }
  ).odp

  // @ts-ignore
  const firstPastedCellData = sanitizerFor(columns[colIndex].type)(pastedData[0][0])

  return { updatedOdp, firstPastedCellData }
}
export default handlePaste
