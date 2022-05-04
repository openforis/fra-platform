import './Topic.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from '@core/utils'

import { Message, MessageTopic, MessageTopicStatus, MessageTopicType } from '@meta/messageCenter'
import { Sockets } from '@meta/socket/sockets'
import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'
import { SocketClient } from '@client/service/socket'

import MessageComponent from './Message'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = (props) => {
  const { topic } = props
  const [message, setMessage] = useState('')

  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

  const messageEvent = Sockets.getTopicMessageEvent({ assessment, cycle, topic })
  const statusEvent = Sockets.getTopicStatusEvent({ assessment, cycle, topic })

  const { section } = useParams<{ section?: string }>()

  const closeTopic = useCallback(() => {
    dispatch(MessageCenterActions.closeTopic({ key: topic.key }))
  }, [dispatch, topic])

  const resolveTopic = useCallback(() => {
    dispatch(
      MessageCenterActions.resolveTopic({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
      })
    )
  }, [countryIso, assessment, cycle, topic, dispatch])

  const postMessage = useCallback(() => {
    dispatch(
      MessageCenterActions.postMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
        type: topic.type,
        section,
      })
    ).then(() => setMessage(''))
  }, [countryIso, assessment, cycle, topic, message, dispatch, section])

  useEffect(() => {
    const newMessageEventHandler = (args: [message: Message]) => {
      const [message] = args
      dispatch(MessageCenterActions.addMessage({ message, topic }))
    }

    const changeStatusEventHandler = (args: [status: MessageTopicStatus]) => {
      const [status] = args
      dispatch(MessageCenterActions.changeStatus({ status, topic }))
    }

    SocketClient.on(messageEvent, newMessageEventHandler).on(statusEvent, changeStatusEventHandler)

    return () => {
      SocketClient.off(messageEvent, newMessageEventHandler).off(statusEvent, changeStatusEventHandler)
    }
  }, [])

  return (
    <div className="topic">
      <div className="topic-header">
        <div className="topic-title">
          {topic.title || topic.key}
          {topic.subtitle && <div className="topic-subtitle">{topic.subtitle}</div>}
        </div>
        <div className="topic-close" onClick={closeTopic} onKeyDown={closeTopic} role="button" tabIndex={0}>
          <Icon name="remove" />
        </div>
        {(Users.isAdministrator(user) || Users.isReviewer(user, countryIso)) &&
          topic.status === MessageTopicStatus.opened &&
          topic.type === MessageTopicType.review && (
            <div className="topic-review">
              <button className="btn btn-primary btn-s" onClick={resolveTopic} type="submit">
                {i18n.t('review.resolve')}
              </button>
            </div>
          )}
      </div>
      <div className="topic-body">
        {topic.messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
        {Objects.isEmpty(topic.messages) && (
          <div className="no-comments">
            <Icon className="icon-24" name="chat-46" />
            <br />
            {i18n.t('review.noComments')}
          </div>
        )}
      </div>
      <div className="topic-footer">
        <textarea
          value={message}
          placeholder={i18n.t('review.writeComment')}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn-s btn-primary" disabled={Objects.isEmpty(message)} onClick={postMessage} type="submit">
          {i18n.t('review.add')}
        </button>
      </div>
    </div>
  )
}

export default Topic
