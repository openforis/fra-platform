import { createSelector } from '@reduxjs/toolkit'

import { ReviewStatus } from 'meta/assessment/review'

import { ReviewSlice } from 'client/store/review/slice'
import { ReviewState } from 'client/store/review/state'
import { RootState } from 'client/store/types'

const getState = (state: RootState) => state[ReviewSlice.name]

const getStatus = createSelector<ReviewStatus>(
  [getState, (_state, key: string) => key],
  (state: ReviewState, key) => state?.status?.[key]
)

export const ReviewSelectors = {
  getStatus,
}
