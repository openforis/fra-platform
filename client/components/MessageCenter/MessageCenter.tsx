import './MessageCenter.scss'
import React from 'react'
import { useTopics } from '@client/store/ui/messageCenter'
import { MessageTopic } from '@meta/messageCenter'
import { Objects } from '@core/utils'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  return (
    <div className="topic">
      <div className="topic-header">{topic.key}</div>
      <div className="topic-body">No comments</div>
      <div className="topic-footer">
        <textarea />
        <div>
          <button className="btn-s btn-secondary" type="submit">
            Add
          </button>
        </div>
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
        return <Topic key={topic.id} topic={topic} />
      })}
    </div>
  )
}

export default MessageCenter
