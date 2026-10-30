import { clearTable } from './clearTable'
import { clickNdpLink } from './clickNdpLink'
import { expectCellEditable } from './expectCellEditable'
import { expectCellHasNoValidationError } from './expectCellHasNoValidationError'
import { expectCellHasValidationError } from './expectCellHasValidationError'
import { expectCellMissing } from './expectCellMissing'
import { expectCellReadOnly } from './expectCellReadOnly'
import { expectCellValue } from './expectCellValue'
import { expectSeededValuesMatch } from './expectSeededValuesMatch'
import { expectTableHasError } from './expectTableHasError'
import { expectTableHasNoError } from './expectTableHasNoError'
import { fillCell } from './fillCell'
import { getCellValue } from './getCellValue'
import { getRowReviewButton } from './getRowReviewButton'
import { pasteCells } from './pasteCells'
import { tableContainer } from './tableContainer'
import { tableValidationErrors } from './tableValidationErrors'

export const TableDomUtils = {
  clearTable,
  clickNdpLink,
  expectCellHasNoValidationError,
  expectCellHasValidationError,
  expectCellEditable,
  expectCellMissing,
  expectCellReadOnly,
  expectCellValue,
  expectSeededValuesMatch,
  expectTableHasError,
  expectTableHasNoError,
  fillCell,
  getCellValue,
  getRowReviewButton,
  pasteCells,
  tableContainer,
  tableValidationErrors,
}
