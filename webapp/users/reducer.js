import { usersFetchCompleted } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [usersFetchCompleted]: (state, action) => action.users
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
