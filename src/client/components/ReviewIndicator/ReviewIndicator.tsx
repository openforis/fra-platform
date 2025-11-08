import './ReviewIndicator.scss'
import React, { useCallback } from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'

import { useAppDispatch } from 'client/store/hooks'
import { MessageCenterActions } from 'client/store/messageCenter/actions'
import { useReviewStatus } from 'client/store/review/hooks/review'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
}

const ReviewIndicator: React.FC = (props: Props) => {
  const { subtitle, title, topicKey } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const { hasUnreadMessages = false, messagesCount = 0, status = MessageTopicStatus.opened } = useReviewStatus(topicKey)

  const openTopic = useCallback(() => {
    dispatch(
      MessageCenterActions.openTopic({
        assessmentName,
        cycleName,
        countryIso,
        sectionName,
        title,
        subtitle,
        key: topicKey,
        type: MessageTopicType.review,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, subtitle, title, topicKey])

  return (
    <button
      className={classNames('review-indicator', {
        open: messagesCount > 0,
        unread: hasUnreadMessages,
        resolved: status === MessageTopicStatus.resolved,
      })}
      onClick={openTopic}
      type="button"
    >
      <Icon name="chat-46" />
    </button>
  )
}

export default ReviewIndicator
