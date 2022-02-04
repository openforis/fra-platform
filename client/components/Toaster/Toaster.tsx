import './Toaster.scss'
import React from 'react'

import { NotificationActions, useNotification } from '@client/store/ui/notification'

import { NotificationMessage } from '@client/store/ui/notification/stateType'
import { useAppDispatch } from '@client/store'

type ToastProps = {
  notification: NotificationMessage
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const dispatch = useAppDispatch()

  const { duration, id, type } = notification

  if (duration) {
    setTimeout(() => dispatch(NotificationActions.removeMessage(id)), duration)
  }

  return (
    <div className={`toast ${type}`}>
      <div>{notification.message}</div>
      <button onClick={() => dispatch(NotificationActions.removeMessage(id))} type="button">
        x
      </button>
    </div>
  )
}

const Toaster: React.FC = () => {
  const notificationState = useNotification()

  return (
    <div className="toaster-container">
      {notificationState.notifications.map((notification) => {
        return <Toast notification={notification} />
      })}
    </div>
  )
}

export default Toaster
