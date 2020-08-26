import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import * as tableWithOdpActions from '../../components/tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../../components/tableWithOdp/reducerFunctions'

const actionHandlers = {
  [tableWithOdpActions.valueChangeStart('forestCharacteristics')]: (state, action) => updateValueReducer(state, action),
  [tableWithOdpActions.valuesFetched('forestCharacteristics')]: (state, action) => ({
    ...state,
    ...action.data,
    generatingFraValues: false,
  }),
  [tableWithOdpActions.generateFraValuesStart('forestCharacteristics')]: (state) => ({
    ...state,
    generatingFraValues: true,
  }),
  [tableWithOdpActions.pasteChangeStart('forestCharacteristics')]: (state, action) =>
    updateValuesReducer(state, action),
  [tableWithOdpActions.odpCleanAction('forestCharacteristics')]: (state) => ({ ...state, odpDirty: false }),
  [tableWithOdpActions.odpDirtyAction]: (state) => ({ ...state, odpDirty: true }),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
