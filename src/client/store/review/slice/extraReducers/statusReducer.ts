import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { getReviewStatus } from 'client/store/review/actions/getReviewStatus'
import { ReviewState } from 'client/store/review/state'

export const statusReducer = (builder: ActionReducerMapBuilder<ReviewState>) => {
  builder.addCase(getReviewStatus.fulfilled, (state, { payload }) => {
    state.status = {
      ...state.status,
      ...payload.reduce((accumulator, value) => {
        return { ...accumulator, [value.key]: value }
      }, {}),
    }
  })
}
