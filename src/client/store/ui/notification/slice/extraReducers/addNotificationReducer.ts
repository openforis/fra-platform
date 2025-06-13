import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { addMessage } from 'client/store/ui/notification/actions/addMessage'
import { NotificationState } from 'client/store/ui/notification/state'

export const addNotificationReducer = (builder: ActionReducerMapBuilder<NotificationState>) => {
  builder.addCase(addMessage, (state, action) => {
    state.notifications.push(action.payload)
  })
}
