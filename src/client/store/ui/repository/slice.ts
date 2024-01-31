import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData'

import { createRepositoryItemReducer } from 'client/store/ui/repository/reducers/createRepositoryItemReducer'
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
    createRepositoryItemReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
