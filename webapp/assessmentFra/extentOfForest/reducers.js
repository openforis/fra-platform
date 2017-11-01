import * as R from 'ramda'

import * as odpTypes from '../../tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../../tableWithOdp/reducerFunctions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [odpTypes.valueChangeStart('extentOfForest')]: (state, action) => updateValueReducer(state, action),
  [odpTypes.valuesFetched('extentOfForest')]: (state, action) => action.data,
  [odpTypes.generateFraValuesStart('extentOfForest')]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [odpTypes.pasteChangeStart('extentOfForest')]: (state, action) => updateValuesReducer(state, action)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
