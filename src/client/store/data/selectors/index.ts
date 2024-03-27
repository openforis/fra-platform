import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'

const getHistory = createSelector(
  (state: RootState) => state.data.history,
  (history) => history
)

const getHistoryItems = createSelector(getHistory, (items) => items)

export const DataSelector = {
  History: {
    getHistory,
    getHistoryItems,
  },
}
