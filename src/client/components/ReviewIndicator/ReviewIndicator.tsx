import './ReviewIndicator.scss'
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'

import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useReviewStatus } from 'client/store/ui/review/hooks'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
}

const ReviewIndicator = (props: Props) => {
  const { title, subtitle, topicKey } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { sectionName } = useParams<{ sectionName?: string }>()

  const { messagesCount = 0, status = MessageTopicStatus.opened, hasUnreadMessages = false } = useReviewStatus(topicKey)

  const openTopic = useCallback(() => {
    dispatch(
      MessageCenterActions.openTopic({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        title,
        subtitle,
        key: topicKey,
        type: MessageTopicType.review,
        sectionName,
      })
    )
  }, [dispatch, countryIso, assessment, cycle, title, subtitle, topicKey, sectionName])

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
