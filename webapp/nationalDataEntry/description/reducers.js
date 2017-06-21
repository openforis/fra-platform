import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [types.descriptionsFetched]: (state, action) => action.data,
  [types.descriptionsChangeStart]: (state, action) => ({
    ...state,
    eofDescriptions: R.pipe(R.assoc(action.descField, action.value), R.assoc('editing', true))(state.eofDescriptions)
  })
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
