import { loginSuccess } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [loginSuccess]: (state, action) => ({...state, userInfo: action.userInfo})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
