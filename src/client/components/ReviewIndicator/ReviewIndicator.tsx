import './ReviewIndicator.scss'
import React, { useCallback } from 'react'
import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter/messageTopic'

import { useAppDispatch } from 'client/store/hooks'
import { MessageCenterActions } from 'client/store/messageCenter/actions'
import { useReviewStatus } from 'client/store/review/hooks/review'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
}

const ReviewIndicator: React.FC<Props> = (props) => {
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
    <Button
      className={classNames('review-indicator', {
        open: messagesCount > 0,
        unread: hasUnreadMessages,
        resolved: status === MessageTopicStatus.resolved,
      })}
      iconName="chat-46"
      inverse
      noBorder
      onClick={openTopic}
      size={ButtonSize.m}
    />
  )
}

export default ReviewIndicator
