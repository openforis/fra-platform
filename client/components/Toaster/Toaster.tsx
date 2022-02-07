import './Toaster.scss'
import React from 'react'

import Icon from '@client/components/Icon'
import { NotificationMessage, NotificationActions, useNotification } from '@client/store/ui/notification'
import { useAppDispatch } from '@client/store'

type ToastProps = {
  notification: NotificationMessage
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const dispatch = useAppDispatch()

  const { duration, id, type } = notification

  const onClose = () => dispatch(NotificationActions.removeMessage(id))

  if (duration) {
    setTimeout(() => dispatch(NotificationActions.removeMessage(id)), duration)
  }

  return (
    <div className={`toast ${type}`}>
      <div>{notification.message}</div>
      <div className="toast-close" onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
        <Icon name="remove" />
      </div>
    </div>
  )
}

const Toaster: React.FC = () => {
  const notificationState = useNotification()

  return (
    <div className="toaster-container">
      {notificationState.notifications.map((notification) => {
        return <Toast key={notification.id} notification={notification} />
      })}
    </div>
  )
}

export default Toaster
