import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import { fetchODP } from './actions'

const originalDataPointSlice = createSlice<OriginalDataPointState, SliceCaseReducers<OriginalDataPointState>>({
  name: 'originalDataPoint',
  initialState: {},
  reducers: {
    updateODP: (state, action: PayloadAction<{ odp: ODP }>) => {
      state.odp = action.payload.odp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchODP.fulfilled, (state, { payload }) => {
      state.odp = payload
    })
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  fetchODP,
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
