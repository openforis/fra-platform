import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { changeStatus } from 'client/store/messageCenter/actions/changeStatus'
import { MessageCenterState } from 'client/store/messageCenter/state'

export const changeStatusReducer = (builder: ActionReducerMapBuilder<MessageCenterState>) => {
  builder.addCase(changeStatus, (state, action) => {
    const { status, topic } = action.payload
    const i = state.topics.findIndex((t) => t.key === topic.key)
    if (i !== -1) {
      const topicState = state.topics[i]
      state.topics[i] = { ...topicState, status }
    }
  })
}
