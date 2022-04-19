import './Topic.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { MessageTopic } from '@meta/messageCenter'
import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

import Message from './Message'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const [message, setMessage] = useState('')

  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const closeTopic = useCallback(() => {
    dispatch(MessageCenterActions.closeTopic({ key: topic.key }))
  }, [dispatch, topic])

  const addMessage = useCallback(() => {
    dispatch(
      MessageCenterActions.addMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
        type: topic.type,
      })
    ).then(() => setMessage(''))
  }, [countryIso, assessment, cycle, topic, message, dispatch])

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
      </div>
      <div className="topic-body">
        {topic.messages.map((message) => (
          <Message key={message.id} message={message} />
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
        <button className="btn-s btn-primary" disabled={Objects.isEmpty(message)} onClick={addMessage} type="submit">
          {i18n.t('review.add')}
        </button>
      </div>
    </div>
  )
}

export default Topic
