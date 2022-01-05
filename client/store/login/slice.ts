import { createSlice, Reducer } from '@reduxjs/toolkit'
import { LoginState } from './stateType'
import { acceptInvitation, fetchUserByInvitation, initLogin } from './actions'

const initialState: LoginState = {
  login: {
    user: {
      type: 'google',
      email: '',
      password: '',
    },
  },
  invitation: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(acceptInvitation.fulfilled, (state, { payload }) => {
      state.invitation.user = payload
    })

    builder.addCase(fetchUserByInvitation.fulfilled, (state, { payload }) => {
      state.invitation.userRole = payload.userRole
      state.invitation.assessment = payload.assessment
      state.invitation.user = payload.user
    })

    builder.addCase(initLogin.fulfilled, (state, { payload }) => {
      state.login.user = payload.user
      state.login.status = 'loaded'
    })
  },
})

export const LoginActions = {
  acceptInvitation,
  fetchUserByInvitation,
  initLogin,
}

export default loginSlice.reducer as Reducer<LoginState>
