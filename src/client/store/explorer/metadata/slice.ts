import { createSlice } from '@reduxjs/toolkit'

import { getMetadataReducer } from 'client/store/explorer/metadata/extraReducers/getMetadataReducer'

export const ExplorerMetadataSlice = createSlice({
  name: 'metadata',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    getMetadataReducer(builder)
  },
})
