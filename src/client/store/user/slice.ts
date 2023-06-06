import { createSlice, Reducer } from '@reduxjs/toolkit'

import { UserManagementActions } from 'client/store/ui/userManagement'

import { initApp } from '../assessment/actions/initApp'
import { LoginActions } from '../login'
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

    builder.addCase(UserManagementActions.updateUser.fulfilled, (state, { payload }) =>
      payload.user.id === state.id ? { ...payload.user, roles: state.roles } : state
    )

    builder.addCase(UserManagementActions.updateRoleProps.fulfilled, (state, { meta }) => {
      const { role } = meta.arg
      const i = state.roles.findIndex((r) => r.id === role.id)
      if (i !== -1) state.roles[i] = { ...state.roles[i], ...role }
    })

    builder.addCase(LoginActions.acceptInvitation.fulfilled, (_, { payload }) => payload)
  },
})

export const UserActions = {
  ...userSlice.actions,
  logout,
}

export default userSlice.reducer as Reducer<UserState>
