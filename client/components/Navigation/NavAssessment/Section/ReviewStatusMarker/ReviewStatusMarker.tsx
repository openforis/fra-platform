import './ReviewStatusMarker.scss'
import React from 'react'

import { ReviewStatus } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'

type Props = {
  status: ReviewStatus
}

const ReviewStatusMarker: React.FC<Props> = (props) => {
  const { status } = props

  if (status.status !== MessageTopicStatus.opened) {
    return null
  }

  return <div className={`nav-review-status__${status.hasUnreadMessages ? 'unread' : 'open'}`} />
}

export default ReviewStatusMarker
