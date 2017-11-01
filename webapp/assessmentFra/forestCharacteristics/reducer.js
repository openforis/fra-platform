import * as odpTypes from '../tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../tableWithOdp/reducerFunctions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('forestCharacteristics')]: (state, action) => updateValueReducer(state, action),
  [odpTypes.pasteChangeStart('forestCharacteristics')]: (state, action) => updateValuesReducer(state, action),
  [odpTypes.valuesFetched('forestCharacteristics')]: (state, action) => action.data
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
