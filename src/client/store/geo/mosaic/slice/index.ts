import { createSlice } from '@reduxjs/toolkit'

import { setOptionsReducer } from 'client/store/geo/mosaic/slice/extraReducers/setOptionsReducer'
import { initialState } from 'client/store/geo/mosaic/state'

import { MosaicSliceName } from './name'

export const MosaicSlice = createSlice({
  initialState,
  name: MosaicSliceName,
  reducers: {},
  extraReducers: (builder) => {
    setOptionsReducer(builder)
  },
})
