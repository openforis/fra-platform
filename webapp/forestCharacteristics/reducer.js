import * as odpTypes from '../originalDataPoint/actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('eof')]: (state, action) => updateValue(state, action),
  [odpTypes.valuesFetched('foc')]: (state, action) => action.data
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
