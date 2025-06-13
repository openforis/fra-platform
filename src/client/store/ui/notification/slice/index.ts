import { createSlice } from '@reduxjs/toolkit'

import { addNotificationReducer } from 'client/store/ui/notification/slice/extraReducers/addNotificationReducer'
import { removeNotificationReducer } from 'client/store/ui/notification/slice/extraReducers/removeNotificationReducer'
import { initialState } from 'client/store/ui/notification/state'

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addNotificationReducer(builder)
    removeNotificationReducer(builder)
  },
})
