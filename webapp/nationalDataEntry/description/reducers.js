import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [types.descriptionsFetchStart]: (state, action) => R.dissoc('fetched')(state.eofDescriptions),
  [types.descriptionsFetched]: (state, action) => R.assoc('fetched', true)(action.data),
  [types.descriptionsChangeStart]: (state, action) => R.pipe(R.assoc(action.descField, action.value), R.dissoc('fetched'))(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
