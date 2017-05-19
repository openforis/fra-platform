import { applicationErrorType, clearApplicationErrorType } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [applicationErrorType]: (state, action) => ({...state, msg: action.error + ''}),
  [clearApplicationErrorType]: (state, action) => ({...state, msg: null})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
