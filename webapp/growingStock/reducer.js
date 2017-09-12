import R from 'ramda'
import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [types.growingStockFetchCompleted]: (state, action) => R.merge(state, action.data)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
