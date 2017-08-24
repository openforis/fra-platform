import * as R from 'ramda'

import * as types from './actions'
import * as odpTypes from '../originalDataPoint/actions'
import * as ODP from '../originalDataPoint/originalDataPoint'
import { applyReducerFunction } from '../utils/reduxUtils'


const actionHandlers = {
  [odpTypes.valueChangeStart('eof')]: (state, action) => ODP.updateValueReducer(state, action),
  [odpTypes.valuesFetched('eof')]: (state, action) => action.data,
  [types.generateFraValuesStart]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [types.pasteChangeStart]: (state, action) => ODP.updateValuesReducer(state, action)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
