import { createSlice } from '@reduxjs/toolkit'

import { getApplicationReducer } from 'client/store/user/extraReducers/getApplicationReducer'
import { getLoginReducer } from 'client/store/user/extraReducers/getLoginReducer'
import { getLogoutReducer } from 'client/store/user/extraReducers/getLogoutReducer'
import { UserState } from 'client/store/user/state'

export const initialState: UserState = null

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLogoutReducer(builder)
    getApplicationReducer(builder)
    getLoginReducer(builder)
  },
})
