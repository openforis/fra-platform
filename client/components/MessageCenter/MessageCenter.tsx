import './MessageCenter.scss'
import React from 'react'
import { useTopics } from '@client/store/ui/messageCenter'
import { Objects } from '@core/utils'
import Topic from './Topic'

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
