import * as R from 'ramda'

import * as tableWithOdpActions from '../../tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../../tableWithOdp/reducerFunctions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [tableWithOdpActions.valueChangeStart('extentOfForest')]: (state, action) => updateValueReducer(state, action),
  [tableWithOdpActions.valuesFetched('extentOfForest')]: (state, action) => ({...state, ...action.data, generatingFraValues: false}),
  [tableWithOdpActions.generateFraValuesStart('extentOfForest')]: (state, action) => ({...state, generatingFraValues: true}),
  [tableWithOdpActions.pasteChangeStart('extentOfForest')]: (state, action) => updateValuesReducer(state, action),
  [tableWithOdpActions.odpDirtyAction]: (state, action) => ({...state, odpDirty: action.dirty})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
