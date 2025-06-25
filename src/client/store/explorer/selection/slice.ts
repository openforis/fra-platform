import { createSlice } from '@reduxjs/toolkit'

import { setCountries } from './reducers/setCountries'
import { setDimensions } from './reducers/setDimensions'
import { setMeasures } from './reducers/setMeasures'
import { setUnits } from './reducers/setUnits'
import { toggleAxis } from './reducers/toggleAxis'

export const ExplorerSelectionSlice = createSlice({
  name: 'selection',
  initialState: {},
  reducers: {
    setCountries,
    setDimensions,
    setMeasures,
    setUnits,
    toggleAxis,
  },
})
