import { createSlice } from '@reduxjs/toolkit'

import { getDataReducer } from 'client/store/explorer/data/extraReducers/getDataReducer'

export const ExplorerDataSlice = createSlice({
  name: 'data',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    getDataReducer(builder)
  },
})
