import { createSlice } from '@reduxjs/toolkit'

import { getLinkedDataSourcesReducer } from 'client/store/data/linkedDataSources/slice/extraReducers/getLinkedDataSourcesReducer'
import { initialState } from 'client/store/data/linkedDataSources/state'

export const LinkedDataSourcesSlice = createSlice({
  name: 'linkedDataSources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLinkedDataSourcesReducer(builder)
  },
})
