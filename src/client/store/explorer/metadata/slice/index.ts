import { createSlice } from '@reduxjs/toolkit'

import { getMetadataReducer } from 'client/store/explorer/metadata/slice/extraReducers/getMetadataReducer'

import { ExplorerMetadataSliceName } from './name'

export const ExplorerMetadataSlice = createSlice({
  name: ExplorerMetadataSliceName,
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    getMetadataReducer(builder)
  },
})
