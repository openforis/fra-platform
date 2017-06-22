import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [types.descriptionsFetched]: (state, action) => {
    const data = {[action.descField]: R.assoc('fetched', true)(action.data[action.descField])}
    return R.merge(state, data)
  },
  [types.descriptionsChangeStart]: (state, action) => {
    const data = {[action.descField]: R.pipe(R.assoc('value', action.value), R.dissoc('fetched'))(state[action.descField])}
    return R.merge(state, data)
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
