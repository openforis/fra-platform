import { createSlice } from '@reduxjs/toolkit'

import { setAxisSelection } from './reducers/setAxisSelection'
import { setCountries } from './reducers/setCountries'
import { setDimensions } from './reducers/setDimensions'
import { setMeasures } from './reducers/setMeasures'
import { setUnits } from './reducers/setUnits'

export const ExplorerSelectionSlice = createSlice({
  name: 'selection',
  initialState: {},
  reducers: {
    setAxisSelection,
    setCountries,
    setDimensions,
    setMeasures,
    setUnits,
  },
})
