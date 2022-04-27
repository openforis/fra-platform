import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { Message, MessageTopic } from '@meta/messageCenter'

import { openTopic, postMessage } from './actions'
import { MessageCenterState } from './stateType'

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
    addMessage: (state, action: PayloadAction<{ message: Message; topic: MessageTopic }>) => {
      const { message, topic } = action.payload
      const i = state.topics.findIndex((t) => t.key === topic.key)
      if (i !== -1) {
        const topicState = state.topics[i]
        state.topics[i] = { ...topicState, messages: [...topicState.messages, message] }
      }
    },
  },
  extraReducers: (builder) => {
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
  postMessage,
  openTopic,
}

export default messageCenterSlice.reducer as Reducer<MessageCenterState>
