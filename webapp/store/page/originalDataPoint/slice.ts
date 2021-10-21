import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import { fetchODP } from '@webapp/store/page/originalDataPoint/actions/fetchODP'
import { updateODP } from '@webapp/store/page/originalDataPoint/actions/updateODP'
import { setODP } from '@webapp/store/page/originalDataPoint/actions/setODP'

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
  setODP,
  updateODP,
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
