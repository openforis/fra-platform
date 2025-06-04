import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getApplicationReducer } from 'client/store/user/extraReducers/getApplicationReducer'
import { getLoginReducer } from 'client/store/user/extraReducers/getLoginReducer'
import { getLogoutReducer } from 'client/store/user/extraReducers/getLogoutReducer'
import { getUserManagementReducer } from 'client/store/user/extraReducers/getUserManagementReducer'

import { UserState } from './stateType'

export const initialState: UserState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLogoutReducer(builder)
    getApplicationReducer(builder)
    getUserManagementReducer(builder)
    getLoginReducer(builder)
  },
})

export default userSlice.reducer as Reducer<UserState>
