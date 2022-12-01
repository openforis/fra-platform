import { createSlice, Reducer } from '@reduxjs/toolkit'

import {
  acceptInvitation,
  changePassword,
  createResetPassword,
  fetchUserByInvitation,
  initLogin,
  localLogin,
} from './actions'
import { LoginState } from './stateType'

const initialState: LoginState = {
  login: {},
  invitation: {},
  resetPassword: {},
  changePassword: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLogin: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(localLogin.fulfilled, () => initialState)

    builder.addCase(acceptInvitation.fulfilled, (state, { payload }) => {
      state.invitation = { ...payload }
    })

    builder.addCase(fetchUserByInvitation.fulfilled, (state, { payload }) => {
      const { assessment, user, userRole, userProviders } = payload
      state.invitation = { assessment, invitedUser: user, userRole, userProviders }
    })

    builder.addCase(initLogin.fulfilled, (state, { payload }) => {
      state.login = { ...state.login, ...payload }
      state.login.status = 'loaded'
    })
  },
})

export const LoginActions = {
  ...loginSlice.actions,
  acceptInvitation,
  fetchUserByInvitation,
  initLogin,
  localLogin,
  createResetPassword,
  changePassword,
}

export default loginSlice.reducer as Reducer<LoginState>
