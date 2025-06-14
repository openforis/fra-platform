import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { removeMessage } from 'client/store/ui/notification/actions/removeMessage'
import { NotificationState } from 'client/store/ui/notification/state'

export const removeNotificationReducer = (builder: ActionReducerMapBuilder<NotificationState>) => {
  builder.addCase(removeMessage, (state, action) => {
    state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
  })
}
