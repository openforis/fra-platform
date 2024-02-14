import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData'

import { repositoryItemReducer } from 'client/store/ui/repository/reducers/repositoryItemReducer'
import { repositoryItemsReducer } from 'client/store/ui/repository/reducers/repositoryItemsReducer'
import { initialState, RepositoryState } from 'client/store/ui/repository/state'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepositoryItem: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      state.repositoryItem = action.payload
    },
    setRepositoryItemProps: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      state.repositoryItem = { ...state.repositoryItem, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    repositoryItemsReducer(builder)
    repositoryItemReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
