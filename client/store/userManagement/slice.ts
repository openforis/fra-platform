import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getUsers, inviteUser, removeInvitation, sendInvitationEmail } from './actions'
import { UserManagementState } from './stateType'

const initialState: UserManagementState = {
  userToEdit: null,
  users: [],
}

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setUserToEdit: (state, { payload }) => {
      state.userToEdit = payload
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
  },
})

export const UserManagementActions = {
  ...userManagementSlice.actions,
  getUsers,
  inviteUser,
  removeInvitation,
  sendInvitationEmail,
}

export default userManagementSlice.reducer as Reducer<UserManagementState>
