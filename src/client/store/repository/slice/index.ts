import { createSlice } from '@reduxjs/toolkit'

import { fileMetaReducer } from 'client/store/repository/slice/extraReducers/fileMetaReducer'
import { repositoryReducer } from 'client/store/repository/slice/extraReducers/repositoryReducer'
import { resetReducer } from 'client/store/repository/slice/extraReducers/resetReducer'
import { setFileReducer } from 'client/store/repository/slice/extraReducers/setFileReducer'
import { setRepositoryItemReducer } from 'client/store/repository/slice/extraReducers/setRepositoryItemReducer'
import { initialState } from 'client/store/repository/state'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resetReducer(builder)
    setFileReducer(builder)
    setRepositoryItemReducer(builder)

    fileMetaReducer(builder)
    repositoryReducer(builder)
  },
})
