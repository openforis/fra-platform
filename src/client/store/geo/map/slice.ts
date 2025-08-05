import { createSlice } from '@reduxjs/toolkit'

import { setOptions } from 'client/store/geo/map/reducers/setOptions'
import { initialState } from 'client/store/geo/map/state'

export const GeoMapSlice = createSlice({
  initialState,
  name: 'map',
  reducers: {
    setOptions,
  },
})
