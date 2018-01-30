import { applyReducerFunction } from '../utils/reduxUtils'
import { lastAuditFeedReceived } from '../audit/actions'

const actionHandlers = {
  // [lastAuditFeedReceived]: (state, action) => ({...state, feed: action.feed})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
