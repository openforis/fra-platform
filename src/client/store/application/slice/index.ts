import { createSlice } from '@reduxjs/toolkit'

import { initAppReducer } from 'client/store/application/slice/extraReducers/initAppReducer'
import { initialState } from 'client/store/application/state'

export const ApplicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    initAppReducer(builder)
  },
})
