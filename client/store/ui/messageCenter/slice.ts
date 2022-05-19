import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { Message, MessageTopic, MessageTopicStatus } from '@meta/messageCenter'

import { openTopic, postMessage, resolveTopic } from './actions'
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
    changeStatus: (state, action: PayloadAction<{ status: MessageTopicStatus; topic: MessageTopic }>) => {
      const { status, topic } = action.payload
      const i = state.topics.findIndex((t) => t.key === topic.key)
      if (i !== -1) {
        const topicState = state.topics[i]
        state.topics[i] = { ...topicState, status }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openTopic.pending, (state, reducer) => {
      const {
        meta: { arg },
      } = reducer

      const { countryIso, key, title, subtitle, type } = arg

      if (state.topics.filter((topic) => topic.key === key).length === 0) {
        if (state.topics.length === 2) state.topics.shift()
        state.topics.push({
          countryIso,
          key,
          title,
          subtitle,
          type,
          status: MessageTopicStatus.resolved,
          loading: true,
        })
      }
    })

    builder.addCase(openTopic.fulfilled, (state, { payload }) => {
      const { key } = payload
      const index = state.topics.findIndex((topic) => topic.key === key)
      state.topics[index] = { ...payload, loading: false }
    })
  },
})

export const MessageCenterActions = {
  ...messageCenterSlice.actions,
  resolveTopic,
  postMessage,
  openTopic,
}

export default messageCenterSlice.reducer as Reducer<MessageCenterState>
