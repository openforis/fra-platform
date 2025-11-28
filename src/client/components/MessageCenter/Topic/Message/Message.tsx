import './Message.scss'
import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Message as MessageType } from 'meta/messageCenter/message'
import { Users } from 'meta/user/users'
import { getRelativeDate } from 'utils/dates'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type MessageProps = {
  message: MessageType
  isMine: boolean
  deleteFunc: (id: number) => void
}

const Message: React.FC<MessageProps> = (props) => {
  const { deleteFunc, isMine = false, message } = props
  const { i18n } = useTranslation()

  const elementRef = useRef<HTMLDivElement>()
  const { deleted } = message

  useLayoutEffect(() => {
    elementRef.current.scrollIntoView()
  }, [])

  return (
    <div ref={elementRef} className={classNames('message', { deleted })}>
      <div className="message-header">
        <img alt="" className="message-avatar" src={ApiEndPoint.User.profilePicture(String(message.user.id))} />
        <div className="message-info">
          <div className={classNames('message-author', { 'author-me': isMine })}>{Users.getFullName(message.user)}</div>

          {isMine && !deleted && message.message !== 'Marked as resolved' && (
            <Button
              className="btn-remove-msg"
              iconName="trash-simple"
              inverse
              noBorder
              onClick={(): void => deleteFunc(message.id)}
              size={ButtonSize.m}
              type={ButtonType.danger}
            />
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
