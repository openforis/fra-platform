import { createSlice, Reducer } from '@reduxjs/toolkit'
import { NotificationState } from './stateType'

const initialState: NotificationState = {
  notifications: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.notifications.push(payload)
    },
    removeMessage: (state, { payload }) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== payload)
    },
  },
})

export const NotificationActions = {
  ...notificationSlice.actions,
}

export default notificationSlice.reducer as Reducer<NotificationState>
