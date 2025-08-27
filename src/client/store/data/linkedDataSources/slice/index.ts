import { createSlice } from '@reduxjs/toolkit'

import { getLinkedDataSourcesReducer } from 'client/store/data/linkedDataSources/slice/extraReducers/getLinkedDataSourcesReducer'
import { initialState } from 'client/store/data/linkedDataSources/state'

import { LinkedDataSourcesSliceName } from './name'

export const LinkedDataSourcesSlice = createSlice({
  name: LinkedDataSourcesSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLinkedDataSourcesReducer(builder)
  },
})
