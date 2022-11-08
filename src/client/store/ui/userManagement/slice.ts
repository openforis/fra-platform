import { createSlice, Reducer } from '@reduxjs/toolkit'

import {
  getUsers,
  getUserToEdit,
  inviteUser,
  removeInvitation,
  sendInvitationEmail,
  updateSectionAuth,
  updateUser,
  updateUserRoles,
} from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  user: null,
  users: [],
  filters: {
    countries: [],
    roles: [],
  },
}

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setUserToEdit: (state, { payload }) => {
      state.user = payload
    },
    updateCountryFilter: (state, { payload }) => {
      state.filters.countries = payload
    },
    updateRolesFilter: (state, { payload }) => {
      state.filters.roles = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })

    builder.addCase(inviteUser.fulfilled, (state, { payload }) => {
      state.users.push(payload)
    })

    builder.addCase(removeInvitation.fulfilled, (state, { payload }) => {
      const i = state.users.findIndex((u) => u.id === payload.userId)
      if (i !== -1) state.users.splice(i, 1)
    })

    builder.addCase(getUserToEdit.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(updateSectionAuth.fulfilled, (state, { payload }) => {
      state.user.roles[0] = payload
    })

    builder.addCase(updateUser.fulfilled, (state, { meta }) => {
      const { user } = meta.arg
      state.user = { ...state.user, ...user }
      const i = state.users.findIndex((u) => u.id === user.id)
      if (i !== -1) state.users[i] = { ...state.users[i], ...user }
    })
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  getUsers,
  getUserToEdit,
  inviteUser,
  removeInvitation,
  sendInvitationEmail,
  updateSectionAuth,
  updateUser,
  updateUserRoles,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
