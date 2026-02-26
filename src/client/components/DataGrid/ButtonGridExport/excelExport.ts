import type { Cell, SheetData } from 'write-excel-file/browser'
import writeXlsxFile from 'write-excel-file/browser'

import { getDataGridElementMatrix } from 'client/components/DataGrid/utils'

type Props = {
  data: Array<Array<string>>
  filename: string
  grid?: HTMLDivElement | null
  prependedRowsCount?: number
}

const TEXT_FORMAT = '@'

const parseNumber = (value: string): number | null => {
  const normalized = value.replace(/\s/g, '')
  const parsed = Number(normalized)

  return normalized.length > 0 && Number.isFinite(parsed) ? parsed : null
}

const getNumberFormat = (value: string): string => {
  const normalized = value.replace(/\s/g, '').replace(/^[+-]/, '')
  const [, decimals = ''] = normalized.split('.')

  return decimals.length > 0 ? `0.${'0'.repeat(decimals.length)}` : '0'
}

const isCategoryCell = (cell: Element): boolean => {
  if (!(cell instanceof HTMLElement)) return false

  return (
    cell.classList.contains('category') ||
    Array.from(cell.classList).some((className) => className.startsWith('subcategory'))
  )
}

const isHeaderCell = (cell: Element | null): boolean => {
  if (!(cell instanceof HTMLElement)) return false

  return cell.classList.contains('header') && !isCategoryCell(cell)
}

const isTextCell = (cell: Element | null): boolean => {
  if (!(cell instanceof HTMLElement)) return false

  const isCountryOptionObservationCell =
    cell.classList.contains('country-option') && cell.classList.contains('observation')

  return (
    isCountryOptionObservationCell ||
    cell.classList.contains('left') ||
    Boolean(cell.querySelector('textarea, .table-grid__select-cell-container')) ||
    Boolean(cell.querySelector('input.input-text:not(.table-grid__data-cell-input-number)'))
  )
}

const toExcelCell = (cell: Element | null, value: string): Cell => {
  if (value.trim().length === 0) return null

  if (isHeaderCell(cell)) {
    return { fontWeight: 'bold', format: TEXT_FORMAT, type: String, value }
  }

  if (isTextCell(cell)) {
    return { format: TEXT_FORMAT, type: String, value }
  }

  const numberValue = parseNumber(value)
  if (numberValue !== null) {
    return { format: getNumberFormat(value), type: Number, value: numberValue }
  }

  return { format: TEXT_FORMAT, type: String, value }
}

export const exportGridDataToExcel = async (props: Props): Promise<void> => {
  const { data, filename, grid, prependedRowsCount = 0 } = props
  const elementMatrix = grid ? getDataGridElementMatrix(grid) : []

  const excelData: SheetData = data.map((row, rowIndex) => {
    return row.map((value, colIndex) => {
      const matrixRowIndex = rowIndex - prependedRowsCount
      const cell = matrixRowIndex >= 0 ? elementMatrix[matrixRowIndex]?.[colIndex] : null

      return toExcelCell(cell, value)
    })
  })

  await writeXlsxFile(excelData, { fileName: filename })
}
