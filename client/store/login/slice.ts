import { createSlice, Reducer } from '@reduxjs/toolkit'
import { LoginState } from './stateType'
import {
  acceptInvitation,
  fetchUserByInvitation,
  initLogin,
  localLogin,
  createResetPassword,
  changePassword,
} from './actions'

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
      state.invitation.userRole = payload.userRole
      state.invitation.assessment = payload.assessment
      state.invitation.invitedUser = payload.user
    })

    builder.addCase(initLogin.fulfilled, (state, { payload }) => {
      state.login = { ...state.login, ...payload }
      state.login.status = 'loaded'
    })


    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.changePassword.message = payload.message
      state.changePassword.error = payload.error
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
