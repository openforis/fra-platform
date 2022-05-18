import './ReviewStatusMarker.scss'
import React from 'react'

import classNames from 'classnames'

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

  return (
    <div
      className={classNames('nav-review-status', {
        read: !status.hasUnreadMessages,
        unread: status.hasUnreadMessages,
      })}
    />
  )
}

export default ReviewStatusMarker
