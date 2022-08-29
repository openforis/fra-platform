import './Message.scss'
import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'
import { getRelativeDate } from '@core/utils/dates'
import classNames from 'classnames'

import { Message as MessageType } from '@meta/messageCenter/message'

import Icon from '@client/components/Icon'

type MessageProps = {
  message: MessageType
  isMine: boolean
  deleteFunc: (id: number) => void
}

const Message: React.FC<MessageProps> = (props) => {
  const { message, isMine = false, deleteFunc } = props
  const { i18n } = useTranslation()

  const elementRef = useRef<HTMLDivElement>()
  const { deleted } = message

  useLayoutEffect(() => {
    elementRef.current.scrollIntoView()
  }, [])

  return (
    <div className={classNames('message', { deleted })} ref={elementRef}>
      <div className="message-header">
        <img className="message-avatar" src={ApiEndPoint.User.profilePicture(String(message.user.id))} alt="" />
        <div className="message-info">
          <div className={classNames('message-author', { 'author-me': isMine })}>{message.user.name}</div>

          {isMine && !deleted && message.message !== 'Marked as resolved' && (
            <button
              type="button"
              className="btn-xs btn-secondary btn-remove-msg"
              onClick={() => deleteFunc(message.id)}
            >
              <Icon name="trash-simple" />
            </button>
          )}

          <div className="message-time">
            {deleted && i18n.t('review.commentDeleted')}
            {!deleted && (getRelativeDate(message.createdTime, i18n) || i18n.t('time.aMomentAgo'))}
          </div>
        </div>
      </div>
      {!deleted && <div className="message-body">{message.message}</div>}
    </div>
  )
}

export default Message
