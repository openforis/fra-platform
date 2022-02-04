import { createSlice, Reducer } from '@reduxjs/toolkit'
import { NotificationState } from './stateType'

const initialState: NotificationState = {
  notifications: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: () => initialState,
    addMessage: (state, { payload }) => {
      state.notifications.push(payload)
    },
    removeMessage: (state, { payload }) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== payload)
    },
    // removeMessage: (state, { payload }) => {
    //   state.notifications.splice(payload, 1)
    // },
  },
})

export const NotificationActions = {
  ...notificationSlice.actions,
}

export default notificationSlice.reducer as Reducer<NotificationState>
