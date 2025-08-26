import { createSlice } from '@reduxjs/toolkit'

import { initAppReducer } from 'client/store/application/slice/extraReducers/initAppReducer'
import { initialState } from 'client/store/application/state'

import { ApplicationSliceName } from './name'

export const ApplicationSlice = createSlice({
  name: ApplicationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    initAppReducer(builder)
  },
})
