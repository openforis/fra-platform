import * as odpTypes from '../originalDataPoint/actions'
import * as ODP from '../originalDataPoint/originalDataPoint'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('forestCharacteristics')]: (state, action) => ODP.updateValueReducer(state, action),
  [odpTypes.pasteChangeStart('forestCharacteristics')]: (state, action) => ODP.updateValuesReducer(state, action),
  [odpTypes.valuesFetched('forestCharacteristics')]: (state, action) => action.data
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
