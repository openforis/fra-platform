import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getReviewStatus, getReviewSummary } from './actions'
import { ReviewState } from './stateType'

const initialState: ReviewState = { statuses: {}, summary: [] }

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewStatus.fulfilled, (state, { payload }) => {
      state.statuses = {
        ...state.statuses,
        ...payload.reduce((accumulator, value) => {
          return { ...accumulator, [value.key]: value }
        }, {}),
      }
    })

    builder.addCase(getReviewSummary.fulfilled, (state, { payload }) => {
      state.summary = payload
    })
  },
})

export const ReviewActions = {
  ...reviewSlice.actions,
  getReviewStatus,
  getReviewSummary,
}

export default reviewSlice.reducer as Reducer<ReviewState>
