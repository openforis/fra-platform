import { createSlice } from '@reduxjs/toolkit'

import { setCountries } from './reducers/setCountries'

export const ExplorerFilterSlice = createSlice({
  name: 'filter',
  initialState: {},
  reducers: {
    setCountries,
  },
})
