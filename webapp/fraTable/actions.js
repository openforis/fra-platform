import * as table from './table'
import assert from 'assert'
import axios from 'axios'
import * as autosave from '../autosave/actions'
import { applicationError } from '../applicationError/actions'

export const tableValueChangedAction = 'fraTable/tableValueChanged'

const createNewTableState = (tableSpec, rowIdx, colIdx, newValue, getState) => {
  const fraTableState = getState().fraTable
  assert(tableSpec.name, 'tableSpec is missing name')
  const tableValues = fraTableState[tableSpec.name] || table.createTableData(tableSpec)
  return table.update(tableValues, rowIdx, colIdx, !isNaN(newValue) ? Number(newValue) : newValue) // TODO use tableSpec for this
}

const saveChanges = (countryIso, tableSpecName, tableState) => {
  const debounced = dispatch =>
    axios.post(`/api/saveFraTable/${countryIso}/${tableSpecName}`, {tableState}).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
    })

  debounced.meta = {
    debounce: {
      time: 800,
      key: 'saveFraTable-' + tableSpecName
    }
  }
  return debounced
}

export const tableValueChanged = (countryIso, tableSpec, rowIdx, colIdx, newValue) => (dispatch, getState) => {
  const newTableState = createNewTableState(tableSpec, rowIdx, colIdx, newValue, getState)
  dispatch({type: tableValueChangedAction, tableSpec, newTableState})
  dispatch(saveChanges(countryIso, tableSpec.name, newTableState))
}
