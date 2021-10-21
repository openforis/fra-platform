import { createSlice, CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import { fetchODP } from './actions'

interface Reducer extends SliceCaseReducers<OriginalDataPointState> {
  setODP: CaseReducer<OriginalDataPointState, PayloadAction<{ odp: ODP }>>
}

export const originalDataPointSlice = createSlice<OriginalDataPointState, Reducer>({
  name: 'originalDataPoint',
  initialState: {},
  reducers: {
    setODP: (state, action) => {
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
