import * as actions from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [actions.tableValueChangedAction]: (state, action) => {
    console.log('table value changed action')
    return {
      ...state,
      [action.tableSpec.name]: {tableData: action.newTableState}
    }
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
