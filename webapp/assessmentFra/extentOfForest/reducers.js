import * as R from 'ramda'

import * as tableWithOdpActions from '../../tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../../tableWithOdp/reducerFunctions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [tableWithOdpActions.valueChangeStart('extentOfForest')]: (state, action) => updateValueReducer(state, action),
  [tableWithOdpActions.valuesFetched('extentOfForest')]: (state, action) => action.data,
  [tableWithOdpActions.generateFraValuesStart('extentOfForest')]: (state, action) => R.assoc('generatingFraValues', true)(state),
  [tableWithOdpActions.pasteChangeStart('extentOfForest')]: (state, action) => updateValuesReducer(state, action),
  [tableWithOdpActions.odpDirtyAction]: (state, action) => ({...state, odpDirty: action.dirty})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
