import './Toaster.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store/hooks'
import { NotificationActions } from 'client/store/ui/notification/actions'
import { useNotification } from 'client/store/ui/notification/hooks'
import { NotificationMessage } from 'client/store/ui/notification/state'
import Icon from 'client/components/Icon'
import { IconName } from 'client/components/Icon/types'

type ToastProps = {
  notification: NotificationMessage
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { duration, id, message, params, type } = notification
  const onClose = () => dispatch(NotificationActions.removeMessage(id))

  if (duration) {
    setTimeout(() => dispatch(NotificationActions.removeMessage(id)), duration)
  }

  let iconName = IconName.roundEInfo
  if (type === 'error') iconName = IconName.alert
  else if (type === 'warning') iconName = IconName.alert
  else if (type === 'success') iconName = IconName.checkCircle08

  return (
    <div className={`toast ${type}`}>
      <Icon className="toast-icon" name={iconName} />
      <div className="toast-message">{t(message, params)}</div>
      <div className="toast-close" onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
        <Icon name={IconName.remove} />
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
