import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getUsers } from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  users: [],
}

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  getUsers,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
