import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { RepositoryItem, RepositoryItemValidator } from 'meta/cycleData'

import { removeRepositoryItemReducer } from 'client/store/ui/repository/reducers/removeRepositoryItemReducer'
import { upsertRepositoryItemReducer } from 'client/store/ui/repository/reducers/upsertRepositoryItemReducer'
import { initialState, RepositoryState } from 'client/store/ui/repository/state'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepositoryItem: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      state.repositoryItem = action.payload
      state.repositoryItemValidation = undefined
    },
    setRepositoryItemProps: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      const repositoryItem = { ...state.repositoryItem, ...action.payload }
      state.repositoryItem = repositoryItem
      state.repositoryItemValidation = RepositoryItemValidator.validate(repositoryItem)
    },
  },
  extraReducers: (builder) => {
    upsertRepositoryItemReducer(builder)
    removeRepositoryItemReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
