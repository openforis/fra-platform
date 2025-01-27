import { createSelector } from '@reduxjs/toolkit'

import { HistoryTarget } from 'meta/cycleData'

import { RootState } from 'client/store/RootState'

const getHistory = createSelector(
  (state: RootState) => state.data.history,
  (history) => history
)

const getHistoryActivities = createSelector(getHistory, (history) => history.activities ?? {})

const getHistoryCompareItem = createSelector(
  [getHistoryActivities, (_, target: HistoryTarget) => target],
  (history, target) => history?.compareItem?.[target]
)

const getHistoryItems = createSelector(getHistoryActivities, (history) => history?.items)

export const DataSelector = {
  History: {
    getHistory,
    getHistoryActivities,
    getHistoryCompareItem,
    getHistoryItems,
  },
}
