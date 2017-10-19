import { autoSaveStart, autoSaveComplete } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import { lastSectionUpdateTimestampReceived } from '../audit/actions'
import { routerFollowLink } from '../router/actions'

const actionHandlers = {
  [autoSaveStart]: (state) => ({...state, status: 'saving'}),
  [autoSaveComplete]: (state) => ({...state, status: 'complete'}),
  [routerFollowLink]: (state) => ({...state, status: null}),
  [lastSectionUpdateTimestampReceived]: (state, action) =>
    ({...state, status: 'lastSaveTimestampReceived', lastSaveTimeStamp: action.timeStamp})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
