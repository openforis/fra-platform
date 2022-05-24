import './Message.scss'
import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@common/api/endpoint'
import { getRelativeDate } from '@core/utils/dates'
import classNames from 'classnames'

import { Message as MessageType } from '@meta/messageCenter/message'

import Icon from '@client/components/Icon'

type MessageProps = {
  message: MessageType
  isMine: boolean
}

const TopicMessage: React.FC<MessageProps> = ({ message, isMine = false }) => {
  const { i18n } = useTranslation()

  const elementRef = useRef<HTMLDivElement>()

  useLayoutEffect(() => {
    elementRef.current.scrollIntoView()
  }, [])

  return (
    <div className="message" ref={elementRef}>
      <div className="message-header">
        <img className="message-avatar" src={ApiEndPoint.User.getProfilePicture(String(message.user.id))} alt="" />
        <div className="message-info">
          <div className={classNames('message-author', { 'author-me': isMine })}>{message.user.name}</div>

          {isMine && (
            <button type="button" className="btn-xs btn-secondary btn-remove-msg" onClick={() => null}>
              <Icon name="trash-simple" />
            </button>
          )}

          <div className="message-time">{getRelativeDate(message.createdTime, i18n) || i18n.t('time.aMomentAgo')}</div>
        </div>
      </div>
      <div className="message-body">{message.message}</div>
    </div>
  )
}

export default TopicMessage
