import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AcceptInvitationErrors, AcceptInvitationFormFields, initialState } from 'client/store/login/state'

import { LoginActions } from './actions'
import { LoginSliceName } from './name'

export const LoginSlice = createSlice({
  name: LoginSliceName,
  initialState,
  reducers: {
    resetLogin: () => initialState,
    resetAcceptInvitationForm: (state) => {
      state.invitation.acceptForm = {}
    },
    updateAcceptInvitationForm: (state, action: PayloadAction<AcceptInvitationFormFields>) => {
      state.invitation.acceptForm ??= {}
      state.invitation.acceptForm = { ...state.invitation.acceptForm, ...action.payload }
    },
    updateAcceptInvitationFormErrors: (state, action: PayloadAction<AcceptInvitationErrors>) => {
      state.invitation.acceptForm ??= {}
      state.invitation.acceptForm.errors = { ...state.invitation.acceptForm.errors, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginActions.localLogin.fulfilled, () => initialState)

    builder.addCase(LoginActions.localLogin.pending, (state) => {
      state.login ??= {}
      state.login.isLoading = true
    })

    builder.addCase(LoginActions.localLogin.rejected, (state) => {
      state.login ??= {}
      state.login.isLoading = false
    })

    builder.addCase(LoginActions.acceptInvitation.fulfilled, () => initialState)

    builder.addCase(LoginActions.fetchUserByInvitation.fulfilled, (state, { payload }) => {
      const { assessment, user, userInvitation, userProviders } = payload
      state.invitation = { assessment, invitedUser: user, userInvitation, userProviders }
    })

    builder.addCase(LoginActions.initLogin.fulfilled, (state, { payload }) => {
      state.login = { ...state.login, ...payload }
      state.login.status = 'loaded'
    })
  },
})
