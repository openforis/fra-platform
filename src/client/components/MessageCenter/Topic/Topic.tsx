import './Topic.scss'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Message as MessageType } from 'meta/messageCenter/message'
import { MessageTopic, MessageTopicStatus, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store/hooks'
import { MessageCenterActions } from 'client/store/messageCenter/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useUser } from 'client/store/user/hooks/user'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'
import Resizable from 'client/components/Resizable'
import { SocketClient } from 'client/service/socket/client'

import Footer from './Footer'
import Message from './Message'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = (props) => {
  const { topic } = props

  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const dataLocked = useIsDataLocked()

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { key: topicKey } = topic

  const closeTopic = useCallback(() => {
    dispatch(MessageCenterActions.closeTopic({ key: topicKey }))
  }, [dispatch, topicKey])

  const deleteMessage = useCallback(
    (messageId: number) => {
      dispatch(
        MessageCenterActions.markMessageDeleted({
          assessmentName,
          countryIso,
          cycleName,
          messageId,
          sectionName: topic.type !== MessageTopicType.review ? topic.type : sectionName,
          topicKey,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName, topic.type, topicKey]
  )

  useEffect(() => {
    const messageAddEvent = Sockets.getTopicMessageAddEvent({ assessment, cycle, topic })
    const messageDeleteEvent = Sockets.getTopicMessageDeleteEvent({ assessment, cycle, topic })
    const statusEvent = Sockets.getTopicStatusEvent({ assessment, cycle, topic })

    const newMessageEventHandler = (args: [message: MessageType]): void => {
      const [message] = args
      dispatch(MessageCenterActions.addMessage({ message, topic }))
    }

    const deleteMessageEventHandler = (args: [arg: { messageId: number; topicKey: string }]): void => {
      const { messageId, topicKey } = args[0]
      dispatch(MessageCenterActions.deleteMessage({ messageId, topicKey }))
    }

    const changeStatusEventHandler = (args: [status: MessageTopicStatus]): void => {
      const [status] = args
      dispatch(MessageCenterActions.changeStatus({ status, topic }))
    }

    SocketClient.on(messageAddEvent, newMessageEventHandler)
      .on(statusEvent, changeStatusEventHandler)
      .on(messageDeleteEvent, deleteMessageEventHandler)

    return () => {
      SocketClient.off(messageAddEvent, newMessageEventHandler)
        .off(statusEvent, changeStatusEventHandler)
        .off(messageDeleteEvent, deleteMessageEventHandler)
    }
  }, [assessment, cycle, dispatch, topic])

  const handleTopicResize = useCallback(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  if (dataLocked && topic.type === MessageTopicType.review) {
    closeTopic()
  }

  return (
    <Resizable
      className="topic"
      defaultSize={{ width: 300, height: '100%' }}
      maxHeight="100%"
      maxWidth={800}
      minHeight={300}
      minWidth={300}
      onResize={handleTopicResize}
    >
      <div className="topic-header">
        <div className="topic-title">
          {topic.title || topicKey}
          {topic.subtitle && <div className="topic-subtitle">{topic.subtitle}</div>}
        </div>
        <div className="topic-close" onClick={closeTopic} onKeyDown={closeTopic} role="button" tabIndex={0}>
          <Icon name="remove" />
        </div>
      </div>
      <div className={classNames('topic-body', { empty: Objects.isEmpty(topic.messages) })}>
        {!topic.loading &&
          !Objects.isEmpty(topic.messages) &&
          topic.messages.map((message) => (
            <Message
              key={message.id}
              deleteFunc={deleteMessage}
              isMine={Number(message.userId) === Number(user.id)}
              message={message}
            />
          ))}
        {!topic.loading && Objects.isEmpty(topic.messages) && (
          <div className="topic__no-comments">
            <Icon className="icon-24" name="chat-46" />
            <br />
            {i18n.t<string>('review.noComments')}
          </div>
        )}
        {topic.loading && <div className="topic__loading">{i18n.t<string>('review.loading')}...</div>}
      </div>

      <Footer topic={topic} />
    </Resizable>
  )
}

export default Topic
