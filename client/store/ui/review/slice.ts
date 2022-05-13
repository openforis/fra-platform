import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getReviewStatus } from './actions'
import { ReviewState } from './stateType'

const initialState: ReviewState = {}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewStatus.fulfilled, (state, action) => {
      const {
        meta: { arg },
        payload,
      } = action
      const section = arg.odpId ? 'odp' : arg.section
      state[section] = {
        ...state[section],
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
