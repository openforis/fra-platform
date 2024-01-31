import { createSlice, Reducer } from '@reduxjs/toolkit'

import { initialState, RepositoryState } from 'client/store/ui/repository/state'

import { saveReducer } from './reducers/saveReducer'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepositoryItem: (state, action) => {
      state.repositoryItem = action.payload
    },
  },
  extraReducers: (builder) => {
    saveReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
