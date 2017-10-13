import { autoSaveStart, autoSaveComplete } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import { routerFollowLink } from '../router/actions'

const actionHandlers = {
  [autoSaveStart]: (state) => ({...state, status: 'saving'}),
  [autoSaveComplete]: (state) => ({...state, status: 'complete'}),
  [routerFollowLink]: (state) => ({...state, status: null})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
