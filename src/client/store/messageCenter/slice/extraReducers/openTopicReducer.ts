import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'

import { openTopic } from 'client/store/messageCenter/actions/openTopic'
import { MessageCenterState } from 'client/store/messageCenter/state'

export const openTopicReducer = (builder: ActionReducerMapBuilder<MessageCenterState>): void => {
  builder.addCase(openTopic.pending, (state, reducer) => {
    const {
      meta: { arg },
    } = reducer

    const { countryIso, key, subtitle, title, type } = arg

    if (state.topics.filter((topic) => topic.key === key).length === 0) {
      if (state.topics.length === 2) state.topics.shift()
      state.topics.push({
        id: -1,
        uuid: null,
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
}
