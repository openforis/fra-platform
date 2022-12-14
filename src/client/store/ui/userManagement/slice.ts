import { createSlice, Reducer } from '@reduxjs/toolkit'

import {
  demoteToUser,
  getUsers,
  getUsersCount,
  getUserToEdit,
  inviteUser,
  promoteToAdmin,
  removeInvitation,
  sendInvitationEmail,
  updateSectionAuth,
  updateUser,
  updateUserRoles,
} from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  count: {
    totals: 0,
  },
  filters: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(demoteToUser.fulfilled, (state, { payload }) => {
      state.user = payload
    })

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

    builder.addCase(promoteToAdmin.fulfilled, (state, { payload }) => {
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
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  demoteToUser,
  getUsers,
  getUsersCount,
  getUserToEdit,
  inviteUser,
  promoteToAdmin,
  removeInvitation,
  sendInvitationEmail,
  updateSectionAuth,
  updateUser,
  updateUserRoles,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
