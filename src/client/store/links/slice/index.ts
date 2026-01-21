import { createSlice } from '@reduxjs/toolkit'

import { getIsVerificationInProgressReducer } from 'client/store/links/slice/extraReducers/getIsVerificationInProgressReducer'
import { resetReducer } from 'client/store/links/slice/extraReducers/resetReducer'
import { setIsVerificationInProgressReducer } from 'client/store/links/slice/extraReducers/setIsVerificationInProgressReducer'
import { initialState } from 'client/store/links/state'

import { LinksSliceName } from './name'

export const LinksSlice = createSlice({
  name: LinksSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getIsVerificationInProgressReducer(builder)
    resetReducer(builder)
    setIsVerificationInProgressReducer(builder)
  },
})
