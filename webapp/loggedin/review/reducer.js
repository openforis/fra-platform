import * as R from 'ramda'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread,
  issueGetSummaryCompleted
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, action) => ({ ...state, 'status': action.status }),
  [issueRetrieveCommentsStarted]: (state, action) => ({ ...state, 'status': action.status }),
  [issueRetrieveCommentsCompleted]: (state, action) => ({
    ...state,
    [action.target]: R.merge(state[action.target], { issue: action.issue })
  }),
  [issueGetSummaryCompleted]: (state, action) =>
    ({
      ...state,
      [action.target]: R.merge(state[action.target], {
        issuesCount: action.issuesCount,
        lastCommentUserId: action.lastCommentUserId,
        issueStatus: action.issueStatus,
        hasUnreadIssues: action.hasUnreadIssues
      })
    })
  ,
  [issueOpenCommentThread]: (state, action) => ({
    ...state,
    'openThread': { target: action.target, section: action.section, name: action.title }
  }),
  [issueCloseCommentThread]: state =>
    R.omit(['openThread'], state),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
