import * as actions from './actions'
import assert from 'assert'
import { applyReducerFunction } from '../utils/reduxUtils'
import * as table from './table'

const actionHandlers = {
  [actions.tableValueChangedAction]: (state, action) => {
    const tableSpec = action.tableSpec
    assert(tableSpec.name, 'tableSpec is missing name')
    const tableValues = state[tableSpec.name] || table.createTableData(tableSpec)
    const updatedValues = table.update(tableValues, action.rowIdx, action.colIdx, Number(action.newValue))
    return {...state, [tableSpec.name]: updatedValues}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
