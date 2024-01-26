import { createSlice, Reducer } from '@reduxjs/toolkit'

import { saveReducer } from './reducers/saveReducer'
import { RepositoryState } from './stateType'

const initialState: RepositoryState = {
  loading: false,
}

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    saveReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
