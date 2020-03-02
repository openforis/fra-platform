import * as actions from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [actions.tableValueChangedAction]: (state, action) => {
    return {
      ...state,
      [action.tableSpec.name]: {tableData: action.newTableState}
    }
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
