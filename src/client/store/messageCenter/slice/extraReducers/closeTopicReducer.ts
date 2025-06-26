import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { closeTopic } from 'client/store/messageCenter/actions/closeTopic'
import { MessageCenterState } from 'client/store/messageCenter/state'

export const closeTopicReducer = (builder: ActionReducerMapBuilder<MessageCenterState>) => {
  builder.addCase(closeTopic, (state, action) => {
    state.topics = state.topics.filter((topic) => topic.key !== action.payload.key)
  })
}
