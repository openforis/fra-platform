import { createSlice } from '@reduxjs/toolkit'

import { addNotificationReducer } from 'client/store/ui/notification/slice/extraReducers/addNotificationReducer'
import { removeNotificationReducer } from 'client/store/ui/notification/slice/extraReducers/removeNotificationReducer'
import { initialState } from 'client/store/ui/notification/state'

import { NotificationSliceName } from './name'

export const NotificationSlice = createSlice({
  name: NotificationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addNotificationReducer(builder)
    removeNotificationReducer(builder)
  },
})
