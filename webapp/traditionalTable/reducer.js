import * as actions from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import { updateValidationStatus }  from './table'

const actionHandlers = {
  [actions.tableValueChangedAction]: (state, action) => {
    return {
      ...state,
      [action.tableSpec.name]: {
        tableData: action.newTableState,
        validationStatus: updateValidationStatus(action.tableSpec, action.newTableState)
      }
    }
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
