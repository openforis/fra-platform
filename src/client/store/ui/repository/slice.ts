import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData'

import { upsertRepositoryItemReducer } from 'client/store/ui/repository/reducers/upsertRepositoryItemReducer'
import { initialState, RepositoryState } from 'client/store/ui/repository/state'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepositoryItem: (state: RepositoryState, action: PayloadAction<RepositoryItem>) => {
      state.repositoryItem = action.payload
    },
  },
  extraReducers: (builder) => {
    upsertRepositoryItemReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
