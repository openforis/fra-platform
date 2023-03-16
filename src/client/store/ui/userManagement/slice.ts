import { createSlice, Reducer } from '@reduxjs/toolkit'

import {
  getUsers,
  getUsersCount,
  getUserToEdit,
  inviteUser,
  removeInvitation,
  sendInvitationEmail,
  updateRoleProps,
  updateSectionAuth,
  updateUser,
  updateUserAdminRole,
  updateUserRoles,
} from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  count: {
    totals: 0,
  },
  filters: {
    userName: '',
    countries: [],
    roles: [],
  },
  user: null,
  users: [],
}

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setUserToEdit: (state, { payload }) => {
      state.user = payload
    },
    updateFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload }
    },
    resetFilters: (state) => {
      state.filters = { countries: [], roles: [], userName: '' }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })

    builder.addCase(getUsersCount.fulfilled, (state, { payload }) => {
      state.count = payload
    })

    builder.addCase(removeInvitation.fulfilled, (state, { payload }) => {
      const i = state.users.findIndex((u) => u.id === payload.userId)
      if (i !== -1) state.users.splice(i, 1)
    })

    builder.addCase(getUserToEdit.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(updateUserAdminRole.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(sendInvitationEmail.fulfilled, (state, { payload }) => {
      const i = state.users.findIndex((u) => u.id === payload.userId)
      if (i !== -1) state.users[i].roles = [payload]
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

    builder.addCase(updateRoleProps.fulfilled, (state, { meta }) => {
      const { role } = meta.arg
      const i = state.user.roles.findIndex((r) => r.id === role.id)
      if (i !== -1) state.user.roles[i] = { ...state.user.roles[i], ...role }
    })
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  getUsers,
  getUsersCount,
  getUserToEdit,
  inviteUser,
  removeInvitation,
  sendInvitationEmail,
  updateSectionAuth,
  updateUser,
  updateUserAdminRole,
  updateUserRoles,
  updateRoleProps,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
