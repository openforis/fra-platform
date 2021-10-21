import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import { setODP } from '@webapp/store/page/originalDataPoint/actions/setODP'
import { fetchODP, deleteODP, updateODP } from './actions'

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
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
