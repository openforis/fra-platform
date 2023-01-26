import { createSlice, Reducer } from '@reduxjs/toolkit'

import { UserManagementActions } from '@client/store/ui/userManagement'

import { initApp } from '../assessment/actions/initApp'
import { logout } from './actions'
import { UserState } from './stateType'

const initialState: UserState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => initialState)
    builder.addCase(initApp.fulfilled, (_, { payload }) => payload.user)
    builder.addCase(UserManagementActions.updateUser.fulfilled, (state, { payload }) => {
      return { ...payload.user, roles: state.roles }
    })
  },
})

export const UserActions = {
  ...userSlice.actions,
  logout,
}

export default userSlice.reducer as Reducer<UserState>
