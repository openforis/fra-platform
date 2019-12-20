import { applicationErrorType, clearApplicationErrorType } from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [applicationErrorType]: (state, action) => ({...state, error: action.error}),
  [clearApplicationErrorType]: (state, action) => ({...state, error: null})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
