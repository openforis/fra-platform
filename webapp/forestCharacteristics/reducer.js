import * as odpTypes from '../originalDataPoint/actions'
import * as ODP from '../originalDataPoint/originalDataPoint'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('foc')]: (state, action) => ODP.updateValueReducer(state, action),
  [odpTypes.pasteChangeStart('foc')]: (state, action) => ODP.updateValuesReducer(state, action),
  [odpTypes.valuesFetched('foc')]: (state, action) => action.data
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
