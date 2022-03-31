import './Message.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Message as MessageType } from '@meta/messageCenter/message'
import { getRelativeDate } from '@core/utils/dates'
import { ApiEndPoint } from '@common/api/endpoint'

type MessageProps = {
  message: MessageType
}

const TopicMessage: React.FC<MessageProps> = ({ message }) => {
  const { i18n } = useTranslation()

  return (
    <div className="message">
      <div className="message-header">
        <img className="message-avatar" src={ApiEndPoint.User.getProfilePicture(String(message.user.id))} alt="" />
        <div className="message-info">
          <div className="message-author">{message.user.name}</div>
          <div className="message-time">{getRelativeDate(message.createdTime, i18n) || i18n.t('time.aMomentAgo')}</div>
        </div>
      </div>
      <div className="message-body">{message.message}</div>
    </div>
  )
}

export default TopicMessage
