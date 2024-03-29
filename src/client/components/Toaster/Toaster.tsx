import './Toaster.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { NotificationActions, NotificationMessage, useNotification } from 'client/store/ui/notification'
import Icon from 'client/components/Icon'

type ToastProps = {
  notification: NotificationMessage
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { duration, id, type, message, params } = notification
  const onClose = () => dispatch(NotificationActions.removeMessage(id))

  if (duration) {
    setTimeout(() => dispatch(NotificationActions.removeMessage(id)), duration)
  }

  let iconName = 'round-e-info'
  if (type === 'error') iconName = 'alert'
  else if (type === 'warning') iconName = 'alert'
  else if (type === 'success') iconName = 'check-circle-08'

  return (
    <div className={`toast ${type}`}>
      <Icon className="toast-icon" name={iconName} />
      <div className="toast-message">{t(message, params)}</div>
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
