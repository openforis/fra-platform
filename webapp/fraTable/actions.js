import * as table from './table'
import assert from 'assert'
import axios from 'axios'
import * as autosave from '../autosave/actions'
import { applicationError } from '../applicationError/actions'
import { acceptNextInteger } from '../utils/numberInput'

export const tableValueChangedAction = 'fraTable/tableValueChanged'

const createNewTableState = (tableSpec, rowIdx, colIdx, newValue, getState) => {
  const fraTableState = getState().fraTable
  assert(tableSpec.name, 'tableSpec is missing name')
  const tableValues = fraTableState[tableSpec.name] || table.createTableData(tableSpec)
  //When we accept more than integers as input, we should use tableSpec to determine
  //the type here and use the proper transformation
  const sanitizedNewValue = acceptNextInteger(newValue, tableValues[rowIdx][colIdx])
  return table.update(tableValues, rowIdx, colIdx, sanitizedNewValue)
}

const saveChanges = (countryIso, tableSpecName, tableState) => {
  const debounced = dispatch =>
    axios.post(`/api/saveFraTable/${countryIso}/${tableSpecName}`, {tableState}).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
      dispatch(autosave.complete)
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
  dispatch(autosave.start)
  dispatch(saveChanges(countryIso, tableSpec.name, newTableState))
}

export const fetchTableData = (countryIso, tableSpec) => dispatch => {
  axios.get(`/api/readFraTable/${countryIso}/${tableSpec.name}`).then(resp => {
    dispatch({type: tableValueChangedAction, tableSpec, newTableState: resp.data})
  }).catch((err) => {
    dispatch(applicationError(err))
  })
}
