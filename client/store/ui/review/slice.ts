import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getReviewStatus } from './actions'
import { ReviewState } from './stateType'

const initialState: ReviewState = { statuses: {} }

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
  },
})

export const ReviewActions = {
  ...reviewSlice.actions,
  getReviewStatus,
}

export default reviewSlice.reducer as Reducer<ReviewState>
