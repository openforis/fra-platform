import './reviewStatus.scss'

import React from 'react'

import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'

type Props = {
  status: any
}

const ReviewStatus = (props: Props) => {
  const { status } = props

  if (status[ReviewStatusState.keys.issueStatus] !== ReviewStatusState.keysIssueStatus.opened) {
    return null
  }

  const className = `nav-review-status__${status[ReviewStatusState.keys.hasUnreadIssues] ? 'unread' : 'open'}`

  return <div className={className} />
}

export default ReviewStatus
