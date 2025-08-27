import { createSlice } from '@reduxjs/toolkit'

import { getDataReducer } from 'client/store/explorer/data/slice/extraReducers/getDataReducer'

import { ExplorerDataSliceName } from './name'

export const ExplorerDataSlice = createSlice({
  name: ExplorerDataSliceName,
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    getDataReducer(builder)
  },
})
