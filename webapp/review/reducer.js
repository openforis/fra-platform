import * as R from 'ramda'

import { applyReducerFunction } from '../utils/reduxUtils'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread,
  reviewGetCommentCountCompleted
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsStarted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsCompleted]: (state, action) => {
    return {...state, [action.target]: R.merge(state[action.target], {issue: action.issue})}
  },
  [reviewGetCommentCountCompleted]: (state, action) =>
  { console.log("action", action)
    return ({...state, [action.target]: R.merge(state[action.target], {count: action.count})})
  },
  [issueOpenCommentThread]: (state, action) => ({...state, 'openThread': action.target}),
  [issueCloseCommentThread]: (state, action) => {
    console.log('state', state)
    const newstate = R.omit(['openThread'], state)
    console.log('new state', newstate)
    return newstate
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
