import * as R from 'ramda'

import * as types from './actions'
import * as odpTypes from '../originalDataPoint/actions'
import { applyReducerFunction } from '../utils/reduxUtils'



const updateValues = (state, action) => {
  const newfra = R.map(fra => {
    const ni = R.findIndex(cd => cd.year === fra.year && fra.type === 'fra')(R.values(action.columnData))
    if (ni === -1) return fra
    return R.merge(fra, R.values(action.columnData)[ni])
  }, state.fra)
  return {...state, fra: R.pipe(R.merge(state.fra), R.values)(newfra)}
}

const actionHandlers = {
  [odpTypes.valueChangeStart('eof')]: (state, action) => updateValue(state, action),
  [odpTypes.valuesFetched('eof')]: (state, action) => action.data,
  [types.generateFraValuesStart]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [types.pasteChangeStart]: (state, action) => updateValues(state, action)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
