import { createSlice, Reducer } from '@reduxjs/toolkit'
import { LoginState } from './stateType'
import { fetchUserByInvitation } from './actions/fetchUserByInvitation'
import { acceptInvitation } from './actions/acceptInvitation'

const initialState: LoginState = {
  invitation: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserByInvitation.fulfilled, (state, { payload }) => {
      state.invitation.userRole = payload.userRole
      state.invitation.assessment = payload.assessment
      state.invitation.user = payload.user
    })
    builder.addCase(acceptInvitation.fulfilled, (state, { payload }) => {
      state.invitation.user = payload
    })
  },
})

export const LoginActions = {
  fetchUserByInvitation,
  acceptInvitation,
}

export default loginSlice.reducer as Reducer<LoginState>
