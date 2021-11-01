import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint/state'

import {
  fetchODP,
  fetchODPs,
  deleteODP,
  updateODP,
  setODP,
  setODPs,
  updateNationalClass,
  pasteNationalClass,
} from './actions'

export const originalDataPointSlice = createSlice<OriginalDataPointState, SliceCaseReducers<OriginalDataPointState>>({
  name: 'originalDataPoint',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setODP, (state, { payload }) => {
      state.odp = payload
    })
    builder.addCase(setODPs, (state, { payload }) => {
      state.odps = payload
    })
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  fetchODP,
  fetchODPs,
  deleteODP,
  setODP,
  setODPs,
  updateODP,
  updateNationalClass,
  pasteNationalClass,
}

export const OriginalDataPointReducer = originalDataPointSlice.reducer
