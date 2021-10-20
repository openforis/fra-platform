import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

export const originalDataPointSlice = createSlice<OriginalDataPointState, SliceCaseReducers<OriginalDataPointState>>({
  name: 'originalDataPoint',
  initialState: {},
  reducers: {
    updateODP: (state, action: PayloadAction<{ odp: ODP }>) => {
      state.odp = action.payload.odp
    },
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
