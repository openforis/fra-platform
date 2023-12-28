import './ReviewIndicator.scss'
import React, { useCallback } from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'

import { useAppDispatch } from 'client/store'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useReviewStatus } from 'client/store/ui/review/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
}

const ReviewIndicator = (props: Props) => {
  const { title, subtitle, topicKey } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const { messagesCount = 0, status = MessageTopicStatus.opened, hasUnreadMessages = false } = useReviewStatus(topicKey)

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

ReviewIndicator.defaultProps = {
  subtitle: null,
}

export default ReviewIndicator
