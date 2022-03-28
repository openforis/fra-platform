import './MessageCenter.scss'
import React, { useState } from 'react'

import Icon from '@client/components/Icon'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions, useTopics } from '@client/store/ui/messageCenter'
import { Objects } from '@core/utils'
import { MessageTopic } from '@meta/messageCenter'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const addMessage = () => {
    dispatch(
      MessageCenterActions.addMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
      })
    ).then(() => setMessage(''))
  }

  return (
    <div className="topic">
      <div className="topic-header">
        {topic.key}
        <div className="topic-close" onClick={() => null} onKeyDown={() => null} role="button" tabIndex={0}>
          <Icon name="remove" />
        </div>
      </div>
      <div className="topic-body">
        <div className="no-comments">
          <Icon className="icon-24" name="chat-46" />
          <br />
          No comments
        </div>
      </div>
      <div className="topic-footer">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="btn-s btn-primary" type="submit" onClick={addMessage}>
          Add
        </button>
      </div>
    </div>
  )
}

const MessageCenter: React.FC = () => {
  const topics = useTopics()

  if (Objects.isEmpty(topics)) return null

  return (
    <div className="topic-container">
      {topics.map((topic) => {
        return <Topic key={topic.key} topic={topic} />
      })}
    </div>
  )
}

export default MessageCenter
