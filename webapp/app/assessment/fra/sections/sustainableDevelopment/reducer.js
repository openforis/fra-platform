import * as R from 'ramda'
import * as types from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [types.sustainableDevelopmentFetchCompleted]: (state, action) => R.merge(state, action.data)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
