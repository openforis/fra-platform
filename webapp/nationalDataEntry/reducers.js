import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const updateValue = (state, action) => {
  const idx = R.findIndex(R.propEq('name', action.name), state.fra)
  return {...state, fra: R.update(idx, {...action.value}, state.fra)}
}

const actionHandlers = {
  [types.valueChangeStart]: (state, action) => updateValue(state, action),
  [types.valuesFetched]: (state, action) => action.data,
  [types.generateFraValuesStart]: (state, action) => R.assoc('generatingFraValues', true)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
