import * as types from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [types.growingStockFetchCompleted]: (state, action) => ({...state, ...action.data}),
  [types.growingStockChanged]: (state, action) => ({...state, ...action.data})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
