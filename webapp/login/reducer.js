import { loginSuccess, loginFailure } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [loginSuccess]: (state, action) => ({...state, userInfo: action.userInfo, loginFailed: false}),
  [loginFailure]: (state, action) => ({...state, loginFailed: true})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
