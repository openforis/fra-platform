import { loginSuccess, loginFailure, userInfo } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [loginSuccess]: (state, action) => ({...state, loginFailed: false, userInfo: null}),
  [loginFailure]: (state, action) => ({...state, loginFailed: true, userInfo: null}),
  [userInfo]: (state, action) => ({...state, userInfo: action.userInfo}),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
