import { getTable } from './_cells'
import { addRow } from './addRow'
import { deleteRow } from './deleteRow'
import { expectCellError } from './expectCellError'
import {
  getCommentsCell,
  getReferenceCell,
  getReferenceEditor,
  getReferenceValidationError,
  getRowUuid,
  getTypeCell,
  getVariablesCell,
  getYearCell,
} from './getCells'
import { clearOption, selectOption } from './selectOption'

export const DataSourceUtils = {
  addRow,
  clearOption,
  deleteRow,
  expectCellError,
  getCommentsCell,
  getReferenceCell,
  getReferenceEditor,
  getReferenceValidationError,
  getRowUuid,
  getTable,
  getTypeCell,
  getVariablesCell,
  getYearCell,
  selectOption,
}
