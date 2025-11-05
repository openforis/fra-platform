import { createSelector } from '@reduxjs/toolkit'

import { UUID } from 'meta/uuid'

import { ReviewSlice } from 'client/store/review/slice'
import { RootState } from 'client/store/types'

const getState = (state: RootState) => state[ReviewSlice.name]
// ====== status
const _getStatus = createSelector(getState, (state) => state.status)

const getStatus = createSelector([_getStatus, (_state, key: string) => key], (status, key) => status?.[key])

const getStatuses = createSelector(_getStatus, (status) => Object.values(status ?? {}))

// ====== summary
const _getSummary = createSelector(getState, (state) => state.summary)

const getSummariesBySectionUuid = createSelector(
  [_getSummary, (_state, sectionUuid: UUID) => sectionUuid],
  (summary, sectionUuid) =>
    summary.filter(
      (reviewSummary) => reviewSummary.parentUuid === sectionUuid || reviewSummary.subSectionUuid === sectionUuid
    )
)

export const ReviewSelectors = {
  getStatus,
  getStatuses,
  getSummariesBySectionUuid,
}
