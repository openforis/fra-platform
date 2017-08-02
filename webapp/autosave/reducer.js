import { autoSaveStart, autoSaveComplete } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [autoSaveStart]: (state) => ({...state, status: 'saving'}),
  [autoSaveComplete]: (state) => ({...state, status: null})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
