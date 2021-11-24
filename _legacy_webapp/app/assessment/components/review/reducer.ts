import { applyReducerFunction } from '../../../../utils/reduxUtils'
import * as ReviewState from '../../../../app/assessment/components/review/reviewState'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread,
  issueGetSummaryCompleted,
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state: any, { status }: any) => ReviewState.assocStatus(status)(state),
  [issueRetrieveCommentsStarted]: (state: any, { status }: any) => ReviewState.assocStatus(status)(state),

  [issueRetrieveCommentsCompleted]: (state: any, { target, issue }: any) =>
    ReviewState.assocDynamicTarget(target)({
      ...ReviewState.getDynamicTarget(target),
      issue,
    })(state),

  [issueGetSummaryCompleted]: (
    state: any,
    { target, issuesCount, lastCommentUserId, issueStatus, hasUnreadIssues }: any
  ) =>
    ReviewState.assocDynamicTarget(target)({
      ...ReviewState.getDynamicTarget(target),
      issuesCount,
      lastCommentUserId,
      issueStatus,
      hasUnreadIssues,
    })(state),

  [issueOpenCommentThread]: (state: any, { target, section, title }: any) =>
    ReviewState.assocOpenThread({ target, section, name: title })(state),
  [issueCloseCommentThread]: (state: any) => ReviewState.omitOpenThread(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
