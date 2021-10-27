import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import { fetchODP, deleteODP, updateODP, setODP, updateNationalClass } from './actions'

export const originalDataPointSlice = createSlice<OriginalDataPointState, SliceCaseReducers<OriginalDataPointState>>({
  name: 'originalDataPoint',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setODP, (state, { payload }) => {
      state.odp = payload
    })
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  fetchODP,
  deleteODP,
  setODP,
  updateODP,
  updateNationalClass,
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
