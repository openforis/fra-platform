import { createSlice } from '@reduxjs/toolkit'

import { setCountries } from './reducers/setCountries'
import { setMeasures } from './reducers/setMeasures'

export const ExplorerFilterSlice = createSlice({
  name: 'filter',
  initialState: {},
  reducers: {
    setCountries,
    setMeasures,
  },
})
