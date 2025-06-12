import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { deleteMessage } from 'client/store/messageCenter/actions/deleteMessage'
import { MessageCenterState } from 'client/store/messageCenter/state'

export const deleteMessageReducer = (builder: ActionReducerMapBuilder<MessageCenterState>) => {
  builder.addCase(deleteMessage, (state, action) => {
    const { messageId, topicKey } = action.payload
    const i = state.topics.findIndex((t) => t.key === topicKey)
    if (i >= 0) {
      const messageIndex = state.topics[i].messages.findIndex((m) => String(m.id) === String(messageId))
      if (messageIndex >= 0) {
        state.topics[i].messages[messageIndex].deleted = true
      }
    }
  })
}
