import { createSlice } from '@reduxjs/toolkit'

import { setPropertyReducer } from 'client/store/geo/layers/slice/extraReducers/setPropertyReducer'
import { initialState } from 'client/store/geo/layers/state'

import { LayersSliceName } from './name'

export const LayersSlice = createSlice({
  initialState,
  name: LayersSliceName,
  reducers: {},
  extraReducers: (builder) => {
    setPropertyReducer(builder)
  },
})
