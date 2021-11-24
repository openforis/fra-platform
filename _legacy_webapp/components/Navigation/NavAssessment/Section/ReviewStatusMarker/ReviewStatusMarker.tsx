import './ReviewStatusMarker.scss'

import React from 'react'

import { ReviewIssueStatus, ReviewStatus } from '@core/reviewStatus'

type Props = {
  status: ReviewStatus
}

const ReviewStatusMarker: React.FC<Props> = (props) => {
  const { status } = props

  if (status.issueStatus !== ReviewIssueStatus.opened) {
    return null
  }

  return <div className={`nav-review-status__${status.hasUnreadIssues ? 'unread' : 'open'}`} />
}

export default ReviewStatusMarker
