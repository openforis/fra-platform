import { createSlice, Reducer } from '@reduxjs/toolkit'
import { MessageTopic } from '@meta/messageCenter'
import { MessageCenterState } from './stateType'
import { addMessage, openTopic } from './actions'

const initialState: MessageCenterState = {
  topics: Array<MessageTopic>(),
}

export const messageCenterSlice = createSlice({
  name: 'messageCenter',
  initialState,
  reducers: {
    reset: () => initialState,
    closeTopic: (state, action) => {
      state.topics = state.topics.filter((topic) => topic.key !== action.payload.key)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, { payload }) => {
      const i = state.topics.findIndex((topic) => topic.key === payload.key)
      if (i !== -1) state.topics[i] = { ...state.topics[i], ...payload }
    })

    builder.addCase(openTopic.fulfilled, (state, { payload }) => {
      if (state.topics.filter((topic) => topic.key === payload.key).length === 0) {
        if (state.topics.length === 2) state.topics.shift()
        state.topics.push(payload)
      }
    })
  },
})

export const MessageCenterActions = {
  ...messageCenterSlice.actions,
  addMessage,
  openTopic,
}

export default messageCenterSlice.reducer as Reducer<MessageCenterState>
