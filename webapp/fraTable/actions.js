import * as table from './table'
import assert from 'assert'

export const tableValueChangedAction = 'fraTable/tableValueChanged'

const createNewTableState = (tableSpec, rowIdx, colIdx, newValue, getState) => {
  const fraTableState = getState().fraTable
  assert(tableSpec.name, 'tableSpec is missing name')
  const tableValues = fraTableState[tableSpec.name] || table.createTableData(tableSpec)
  return table.update(tableValues, rowIdx, colIdx, !isNaN(newValue) ? Number(newValue) : newValue) // TODO use tableSpec for this
}

const saveChanges = () => {}

export const tableValueChanged = (tableSpec, rowIdx, colIdx, newValue) => (dispatch, getState) => {
  const newTableState = createNewTableState(tableSpec, rowIdx, colIdx, newValue, getState)
  dispatch({type: tableValueChangedAction, tableSpec, newTableState})
  dispatch(saveChanges)
}
