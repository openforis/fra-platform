import { createSlice } from '@reduxjs/toolkit'

import { setOptionsReducer } from 'client/store/geo/map/slice/extraReducers/setOptionsReducer'
import { initialState } from 'client/store/geo/map/state'

import { GeoMapSliceName } from './name'

export const GeoMapSlice = createSlice({
  initialState,
  name: GeoMapSliceName,
  reducers: {},
  extraReducers: (builder) => {
    setOptionsReducer(builder)
  },
})
