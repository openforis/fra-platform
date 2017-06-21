import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const updateValue = (state, action) => {
  const idx = R.findIndex(R.propEq('name', action.name), state.fra)
  return {...state, fra: R.update(idx, {...action.value}, state.fra)}
}

const updateValues = (state, action) => {
  const newfra = R.map(fra => {
    const ni = R.findIndex(cd => cd.year === fra.year && fra.type === 'fra')(R.values(action.columnData))
    if (ni === -1) return fra
    return R.merge(fra, R.values(action.columnData)[ni])
  }, state.fra)
  return {...state, fra: R.merge(state.fra, newfra)}
}

const actionHandlers = {
  [types.valueChangeStart]: (state, action) => updateValue(state, action),
  [types.valuesFetched]: (state, action) => action.data,
  [types.generateFraValuesStart]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [types.pasteChangeStart]: (state, action) => updateValues(state, action)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
