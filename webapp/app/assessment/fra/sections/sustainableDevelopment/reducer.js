import * as R from 'ramda'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import * as types from './actions'

const actionHandlers = {
  [types.sustainableDevelopmentFetchCompleted]: (state, action) => R.merge(state, action.data),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
