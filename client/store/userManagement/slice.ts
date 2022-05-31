import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getCountryUsers } from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  users: [],
}

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountryUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  getCountryUsers,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
