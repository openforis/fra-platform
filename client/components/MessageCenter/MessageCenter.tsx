import './MessageCenter.scss'
import React from 'react'
import { useTopics } from '@client/store/ui/messageCenter'
import Icon from '@client/components/Icon'
import { Objects } from '@core/utils'
import { MessageTopic } from '@meta/messageCenter'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
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
        <textarea />
        <button className="btn-s btn-primary" type="submit">
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
