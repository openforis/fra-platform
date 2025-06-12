import { createSlice } from '@reduxjs/toolkit'

import { addMessageReducer } from 'client/store/messageCenter/slice/extraReducers/addMessageReducer'
import { changeStatusReducer } from 'client/store/messageCenter/slice/extraReducers/changeStatusReducer'
import { closeTopicReducer } from 'client/store/messageCenter/slice/extraReducers/closeTopicReducer'
import { deleteMessageReducer } from 'client/store/messageCenter/slice/extraReducers/deleteMessageReducer'
import { openTopicReducer } from 'client/store/messageCenter/slice/extraReducers/openTopicReducer'
import { resetReducer } from 'client/store/messageCenter/slice/extraReducers/resetReducer'
import { initialState } from 'client/store/messageCenter/state'

export const MessageCenterSlice = createSlice({
  name: 'messageCenter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resetReducer(builder)
    closeTopicReducer(builder)
    addMessageReducer(builder)
    deleteMessageReducer(builder)
    changeStatusReducer(builder)
    openTopicReducer(builder)
  },
})
