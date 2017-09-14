import * as R from 'ramda'

import * as odpTypes from '../originalDataPoint/actions'
import * as ODP from '../originalDataPoint/originalDataPoint'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('extentOfForest')]: (state, action) => ODP.updateValueReducer(state, action),
  [odpTypes.valuesFetched('extentOfForest')]: (state, action) => action.data,
  [odpTypes.generateFraValuesStart('extentOfForest')]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [odpTypes.pasteChangeStart('extentOfForest')]: (state, action) => ODP.updateValuesReducer(state, action)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
