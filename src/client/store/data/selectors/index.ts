import { createSelector } from '@reduxjs/toolkit'

import { HistoryTarget } from 'meta/cycleData'

import { RootState } from 'client/store/RootState'

const getHistory = createSelector(
  (state: RootState) => state.data.history,
  (history) => history
)

// history activities
const getHistoryActivities = createSelector(getHistory, (history) => history.activities ?? {})

const getHistoryCompareItem = createSelector(
  [getHistoryActivities, (_, target: HistoryTarget) => target],
  (history, target) => history?.compareItem?.[target]
)

const getHistoryItems = createSelector(getHistoryActivities, (history) => history?.items)

// history last approved
const getHistoryLastApproved = createSelector(getHistory, (history) => history.lastApproved ?? {})
const isHistoryLastApprovedActive = createSelector(getHistoryLastApproved, (history) => Boolean(history?.active))

export const DataSelector = {
  History: {
    getHistory,
    // activities
    getHistoryActivities,
    getHistoryCompareItem,
    getHistoryItems,
    // lastApproved
    isHistoryLastApprovedActive,
  },
}
