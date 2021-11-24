import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '../../../../components/icon'

import { getIssueSummary, openCommentThread, closeCommentThread } from './actions'
import { isPrintingMode } from '../../../../pages/AssessmentPrint/printAssessment'

const CommentStatus = ({ count, active, issueStatus, hasUnreadIssues, ...props }: any) => {
  const getIssueStatusCssClass = () =>
    issueStatus === 'resolved' ? 'issue-resolved' : hasUnreadIssues ? 'unread-issue' : ''

  return (
    <div {...props} className={`fra-review__issue-status${count > 0 ? '-opened' : ''}${active ? ' active' : ''}`}>
      {count > 0 ? (
        <div className={`icon-container ${getIssueStatusCssClass()}`}>
          <Icon name="chat-46" />
        </div>
      ) : (
        <Icon name="circle-add" />
      )}
    </div>
  )
}
type Props = {
  countryIso: any
  section: any
  target: any
  openCommentThread?: any
  title: any
  getIssueSummary?: any
  openThread?: any
}
const ReviewIndicator = (props: Props) => {
  const { countryIso, section, target, openCommentThread, title, getIssueSummary, openThread } = props

  if (!isPrintingMode()) {
    useEffect(() => {
      getIssueSummary(countryIso, section, target)
    }, [])
  }

  const targetProps = (props as any)[target] || {}
  const count = R.isNil(targetProps) ? 0 : targetProps.issuesCount
  const issueStatus = R.isNil(targetProps) ? null : targetProps.issueStatus
  const hasUnreadIssues = R.isNil(targetProps) ? false : targetProps.hasUnreadIssues
  const active = openThread && section == openThread.section && R.equals(target, openThread.target)

  return (
    <div className="fra-review__add-issue no-print">
      <CommentStatus
        count={count}
        active={active}
        issueStatus={issueStatus}
        hasUnreadIssues={hasUnreadIssues}
        onClick={() => openCommentThread(countryIso, section, target, title)}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => R.merge(state.review, state.user)

export default connect(mapStateToProps, {
  openCommentThread,
  closeCommentThread,
  getIssueSummary,
})(ReviewIndicator)
