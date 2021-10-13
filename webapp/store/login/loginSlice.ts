import { LoginState } from '@webapp/store/login/loginStateType'
import { createSlice } from '@reduxjs/toolkit'

import { initLogin, localLoginSubmit, resetPassword, findResetPassword, changePassword } from './actions'

const initialState: LoginState = {
  login: {
    user: { type: 'google', email: '', password: '' },
  },
  localLogin: {},
  resetPassword: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLocalLoginMessage: (state, { payload = '' }) => {
      state.localLogin.message = payload
    },
    updateResetPasswordMessage: (state, { payload = {} }) => {
      const { message = null, error = null } = payload
      state.localLogin.resetPassword = {
        message,
        error,
      }
    },
    updateLoginUser: (state, { payload }) => {
      state.login.user[payload.field] = payload.value
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initLogin.fulfilled, (state, { payload }) => {
      state.login.invitation = payload.invitation
      state.login.user = payload.user
      state.login.status = 'loaded'
    })

    builder
      .addCase(localLoginSubmit.fulfilled, (state, { payload }) => {
        state.localLogin.message = payload
      })
      .addCase(localLoginSubmit.rejected, (state, { payload }) => {
        state.localLogin.message = payload
      })
    builder
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.localLogin.resetPassword.message = payload.message
        state.localLogin.resetPassword.error = payload.error
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.localLogin.resetPassword.error = payload
      })

    builder
      .addCase(findResetPassword.fulfilled, (state, { payload }) => {
        state.resetPassword.status = 'loaded'
        state.resetPassword.data = payload.resetPassword
      })
      .addCase(findResetPassword.rejected, (state) => {
        state.resetPassword.status = 'error'
      })

    builder
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.changePassword.message = payload
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.changePassword.error = payload
      })
  },
})

export const LoginActions = {
  ...loginSlice.actions,
  initLogin,
  localLoginSubmit,
  resetPassword,
  findResetPassword,
  changePassword,
}

export default loginSlice.reducer
