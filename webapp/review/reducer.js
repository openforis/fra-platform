import * as R from 'ramda'

import { applyReducerFunction } from '../utils/reduxUtils'
import { routerFollowLink } from '../router/actions'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread,
  issueGetSummaryCompleted
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsStarted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsCompleted]: (state, action) => ({
    ...state,
    [action.target]: R.merge(state[action.target], {issue: action.issue})
  }),
  [issueGetSummaryCompleted]: (state, action) =>
    ({
      ...state,
      [action.target]: R.merge(state[action.target], {
        count: action.count,
        lastCommentUserId: action.lastCommentUserId,
        issueStatus: action.issueStatus
      })
    })
  ,
  [issueOpenCommentThread]: (state, action) => ({
    ...state,
    'openThread': {target: action.target, section: action.section, name: action.name}
  }),
  [issueCloseCommentThread]: state =>
    R.omit(['openThread'], state),
  [routerFollowLink]: state => R.omit(['openThread'], state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
