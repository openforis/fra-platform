import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread,
  issueGetSummaryCompleted
} from './actions'

import * as ReviewState from '@webapp/loggedin/review/reviewState'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, { status }) => ReviewState.assocStatus(status)(state),
  [issueRetrieveCommentsStarted]: (state, { status }) => ReviewState.assocStatus(status)(state),

  [issueRetrieveCommentsCompleted]: (state, { target, issue }) =>
    ReviewState.assocDynamicTarget(target)(
      {
        ...ReviewState.getDynamicTarget(target),
        issue
      }
    )(state),

  [issueGetSummaryCompleted]: (state, { target, issuesCount, lastCommentUserId, issueStatus, hasUnreadIssues }) =>
    ReviewState.assocDynamicTarget(target)(
      {
        ...ReviewState.getDynamicTarget(target),
        issuesCount,
        lastCommentUserId,
        issueStatus,
        hasUnreadIssues
      }
    )(state),

  [issueOpenCommentThread]: (state, { target, section, title }) =>
    ReviewState.assocOpenThread({ target, section, name: title })(state),
  [issueCloseCommentThread]: state => ReviewState.omitOpenThread()(state),

}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
