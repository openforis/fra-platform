import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const updateValue = (state, action) => {
  const idx = R.findIndex(R.propEq('name', action.name), state.fra)
  const newState = R.clone(state)
  const value = action.value ? Number(action.value) : null
  newState.fra[idx] = R.assoc('forestArea', value)(newState.fra[idx])
  return newState
}

const actionHandlers = {
  [types.valueChangeStart]: (state, action) => updateValue(state, action),
  [types.valuesFetched]: (state, action) => action.data,
  [types.generateFraValuesStart]: (state, action) => R.assoc('generatingFraValues', true)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
