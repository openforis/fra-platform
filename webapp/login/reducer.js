import { userInfo } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [userInfo]: (state, action) => ({...state, userInfo: action.userInfo}),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
