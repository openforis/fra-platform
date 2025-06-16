import { createSelector } from '@reduxjs/toolkit'

import { ReviewSlice } from 'client/store/review/slice'
import { RootState } from 'client/store/types'

const getState = (state: RootState) => state[ReviewSlice.name]
// ====== status
const _getStatus = createSelector(getState, (state) => state.status)

const getStatus = createSelector([_getStatus, (_state, key: string) => key], (status, key) => status?.[key])

const getStatuses = createSelector(_getStatus, (status) => Object.values(status ?? {}))

// ====== summary
const _getSummary = createSelector(getState, (state) => state.summary)

const getSummariesBySectionId = createSelector(
  [_getSummary, (_state, sectionId: number) => sectionId],
  (summary, sectionId) =>
    summary.filter((reviewSummary) => reviewSummary.parentId === sectionId || reviewSummary.subSectionId === sectionId)
)

export const ReviewSelectors = {
  getStatus,
  getStatuses,
  getSummariesBySectionId,
}
