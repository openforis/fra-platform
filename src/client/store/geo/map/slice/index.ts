import { createSlice } from '@reduxjs/toolkit'

import { setOptions } from 'client/store/geo/map/slice/reducers/setOptions'
import { initialState } from 'client/store/geo/map/state'

import { GeoMapSliceName } from './name'

export const GeoMapSlice = createSlice({
  initialState,
  name: GeoMapSliceName,
  reducers: {
    setOptions,
  },
})
