import { createSlice } from '@reduxjs/toolkit'

import { setAxisSelection } from 'client/store/explorer/selection/slice/reducers/setAxisSelection'
import { setCountries } from 'client/store/explorer/selection/slice/reducers/setCountries'
import { setCountryOptions } from 'client/store/explorer/selection/slice/reducers/setCountryOptions'
import { setDimensions } from 'client/store/explorer/selection/slice/reducers/setDimensions'
import { setMeasures } from 'client/store/explorer/selection/slice/reducers/setMeasures'
import { setUnits } from 'client/store/explorer/selection/slice/reducers/setUnits'

import { ExplorerSelectionSliceName } from './name'

export const ExplorerSelectionSlice = createSlice({
  name: ExplorerSelectionSliceName,
  initialState: {},
  reducers: {
    setAxisSelection,
    setCountries,
    setCountryOptions,
    setDimensions,
    setMeasures,
    setUnits,
  },
})
