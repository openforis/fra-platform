import './Topic.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Message as MessageType, MessageTopic, MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'
import TextArea from 'client/components/Inputs/TextArea'
import Resizable from 'client/components/Resizable'
import { SocketClient } from 'client/service/socket'

import Message from './Message'

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

  let sectionName = useParams<{ sectionName: string }>()?.sectionName
  if (topic.type !== MessageTopicType.review) sectionName = topic.type

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
        sectionName,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch, sectionName, topic.key])

  const postMessage = useCallback(() => {
    dispatch(
      MessageCenterActions.postMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
        type: topic.type,
        sectionName,
      })
    ).then(() => setMessage(''))
  }, [countryIso, assessment, cycle, topic, message, dispatch, sectionName])

  const deleteMessage = useCallback(
    (id: number) =>
      dispatch(
        MessageCenterActions.markMessageDeleted({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          topicKey: topic.key,
          messageId: id,
          sectionName,
        })
      ),
    [countryIso, assessment, cycle, topic, dispatch, sectionName]
  )

  useEffect(() => {
    const messageAddEvent = Sockets.getTopicMessageAddEvent({ assessment, cycle, topic })
    const messageDeleteEvent = Sockets.getTopicMessageDeleteEvent({ assessment, cycle, topic })
    const statusEvent = Sockets.getTopicStatusEvent({ assessment, cycle, topic })

    const newMessageEventHandler = (args: [message: MessageType]) => {
      const [message] = args
      dispatch(MessageCenterActions.addMessage({ message, topic }))
    }

    const deleteMessageEventHandler = (args: [arg: { messageId: number; topicKey: string }]) => {
      const { messageId, topicKey } = args[0]
      dispatch(MessageCenterActions.deleteMessage({ messageId, topicKey }))
    }

    const changeStatusEventHandler = (args: [status: MessageTopicStatus]) => {
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
  }, [assessment, cycle, topic, dispatch])

  const handleTopicResize = useCallback(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <Resizable
      defaultSize={{ width: 300, height: '100%' }}
      minHeight={300}
      minWidth={300}
      maxWidth={800}
      maxHeight="100%"
      className="topic"
      onResize={handleTopicResize}
    >
      <div className="topic-header">
        <div className="topic-title">
          {topic.title || topic.key}
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
              message={message}
              isMine={Number(message.userId) === Number(user.id)}
              deleteFunc={deleteMessage}
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

      <div className="topic__footer">
        {(topic.status === MessageTopicStatus.opened ||
          (topic.status === MessageTopicStatus.resolved &&
            (Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)))) && (
          <DataGrid className="topic-form" gridTemplateColumns="1fr auto">
            <DataCell lastCol lastRow>
              <TextArea
                maxHeight={200}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={i18n.t('review.writeComment')}
                rows={2}
                value={message}
              />
            </DataCell>
            <DataCell noBorder>
              <button
                className="btn-s btn-primary"
                disabled={Objects.isEmpty(message)}
                onClick={postMessage}
                type="submit"
              >
                {i18n.t<string>('common.add')}
              </button>
            </DataCell>
          </DataGrid>
        )}
        {topic.type === MessageTopicType.review &&
          topic.status === MessageTopicStatus.opened &&
          topic.messages.length !== 0 &&
          (Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)) && (
            <div className="topic-review">
              <button className="btn btn-secondary btn-s" onClick={resolveTopic} type="submit">
                {i18n.t<string>('review.resolve')}
              </button>
            </div>
          )}
      </div>
    </Resizable>
  )
}

export default Topic
