import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.messageCenter

const getTopics = createSelector(getState, (state) => state.topics)

export const MessageCenterSelectors = {
  getTopics,
}
