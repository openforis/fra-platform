import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { getReviewSummary } from 'client/store/review/actions/getReviewSummary'
import { ReviewState } from 'client/store/review/state'

export const summaryReducer = (builder: ActionReducerMapBuilder<ReviewState>) => {
  builder.addCase(getReviewSummary.fulfilled, (state, { payload }) => {
    state.summary = payload
  })
}
