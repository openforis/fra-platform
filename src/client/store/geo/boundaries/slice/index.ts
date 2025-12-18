import { createSlice } from '@reduxjs/toolkit'

import { getUnBoundariesLayerReducer } from 'client/store/geo/boundaries/slice/extraReducers/getUnBoundariesLayerReducer'
import { setShowUnBoundariesReducer } from 'client/store/geo/boundaries/slice/extraReducers/setShowUnBoundariesReducer'
import { initialState } from 'client/store/geo/boundaries/state'

import { GeoBoundariesSliceName } from './name'

export const GeoBoundariesSlice = createSlice({
  initialState,
  name: GeoBoundariesSliceName,
  reducers: {},
  extraReducers: (builder) => {
    getUnBoundariesLayerReducer(builder)
    setShowUnBoundariesReducer(builder)
  },
})
