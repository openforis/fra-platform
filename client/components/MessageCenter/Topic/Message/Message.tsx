import './Message.scss'
import React from 'react'

import { Message as MessageType } from '@meta/messageCenter/message'

type MessageProps = {
  message: MessageType
}

const TopicMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="message">
      <div className="message-header">
        <div className="message-author">{message.user.name}</div>
      </div>
      <div className="message-body">{message.message}</div>
    </div>
  )
}

export default TopicMessage
