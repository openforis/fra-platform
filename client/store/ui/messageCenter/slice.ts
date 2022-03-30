import { createSlice, Reducer } from '@reduxjs/toolkit'
import { MessageTopic } from '@meta/messageCenter'
import { MessageCenterState } from './stateType'

const initialState: MessageCenterState = {
  topics: Array<MessageTopic>(),
}

export const messageCenterSlice = createSlice({
  name: 'messageCenter',
  initialState,
  reducers: {
    reset: () => initialState,
    open: (state, action) => {
      if (state.topics.filter((topic) => topic.key === action.payload.key).length === 0) {
        if (state.topics.length === 2) state.topics.shift()
        state.topics.push(action.payload)
      }
    },
  },
})

export const MessageCenterActions = {
  ...messageCenterSlice.actions,
}

export default messageCenterSlice.reducer as Reducer<MessageCenterState>
