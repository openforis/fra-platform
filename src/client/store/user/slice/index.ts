import { createSlice } from '@reduxjs/toolkit'

import { getApplicationReducer } from 'client/store/user/slice/extraReducers/getApplicationReducer'
import { getLogoutReducer } from 'client/store/user/slice/extraReducers/getLogoutReducer'
import { setUserReducer } from 'client/store/user/slice/extraReducers/setUserReducer'
import { UserState } from 'client/store/user/state'

import { UserSliceName } from './name'

export const initialState: UserState = null

export const UserSlice = createSlice({
  name: UserSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLogoutReducer(builder)
    getApplicationReducer(builder)
    setUserReducer(builder)
  },
})
