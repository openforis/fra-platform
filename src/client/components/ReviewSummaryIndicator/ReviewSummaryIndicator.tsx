import './ReviewSummaryIndicator.scss'
import React from 'react'

import classNames from 'classnames'

import { ReviewStatus } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'

type Props = {
  status: ReviewStatus
}

const ReviewSummaryIndicator: React.FC<Props> = (props) => {
  const { status } = props

  if (status.status !== MessageTopicStatus.opened) {
    return null
  }

  return (
    <div
      className={classNames('review-summary-status', {
        read: !status.hasUnreadMessages,
        unread: status.hasUnreadMessages,
      })}
    />
  )
}

export default ReviewSummaryIndicator
