import { createSlice } from '@reduxjs/toolkit'

import { applyOptionsReducer } from 'client/store/geo/mosaic/slice/extraReducers/applyOptionsReducer'
import { setUiOptionsReducer } from 'client/store/geo/mosaic/slice/extraReducers/setUiOptionsReducer'
import { initialState } from 'client/store/geo/mosaic/state'

import { MosaicSliceName } from './name'

export const MosaicSlice = createSlice({
  initialState,
  name: MosaicSliceName,
  reducers: {},
  extraReducers: (builder) => {
    applyOptionsReducer(builder)
    setUiOptionsReducer(builder)
  },
})
