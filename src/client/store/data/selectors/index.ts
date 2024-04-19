import { createSelector } from '@reduxjs/toolkit'

import { HistoryTarget } from 'meta/cycleData'

import { RootState } from 'client/store/RootState'

const getHistory = createSelector(
  (state: RootState) => state.data.history,
  (history) => history
)

const getHistoryCompareItem = createSelector(
  [getHistory, (_, target: HistoryTarget) => target],
  (history, target) => history.compareItem?.[target]
)

const getHistoryItems = createSelector(getHistory, (history) => history.items)

export const DataSelector = {
  History: {
    getHistory,
    getHistoryCompareItem,
    getHistoryItems,
  },
}
