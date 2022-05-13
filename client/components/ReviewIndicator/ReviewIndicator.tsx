import './ReviewIndicator.scss'
import React, { useCallback } from 'react'

import classNames from 'classnames'

import { MessageTopicStatus, MessageTopicType } from '@meta/messageCenter'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useReviewStatus } from '@client/store/ui/review/hooks'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
  section: string
}

const ReviewIndicator = (props: Props) => {
  const { title, subtitle, topicKey, section } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

  const {
    messagesCount = 0,
    status = MessageTopicStatus.opened,
    lastMessageUserId = user.id,
  } = useReviewStatus(section, topicKey)

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
        section,
      })
    )
  }, [dispatch, countryIso, assessment, cycle, title, subtitle, topicKey, section])

  return (
    <button
      className={classNames('review-indicator', {
        open: messagesCount > 0,
        unread: lastMessageUserId !== user.id,
        resolved: status === MessageTopicStatus.resolved,
      })}
      onClick={openTopic}
      type="button"
    >
      {messagesCount === 0 ? <Icon name="circle-add" /> : <Icon name="chat-46" />}
    </button>
  )
}

ReviewIndicator.defaultProps = {
  subtitle: null,
}

export default ReviewIndicator
