import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { addMessage } from 'client/store/messageCenter/actions/addMessage'
import { MessageCenterState } from 'client/store/messageCenter/state'

export const addMessageReducer = (builder: ActionReducerMapBuilder<MessageCenterState>) => {
  builder.addCase(addMessage, (state, action) => {
    const { message, topic } = action.payload
    const i = state.topics.findIndex((t) => t.key === topic.key)
    if (i !== -1) {
      const topicState = state.topics[i]
      state.topics[i] = { ...topicState, messages: [...topicState.messages, message] }
    }
  })
}
