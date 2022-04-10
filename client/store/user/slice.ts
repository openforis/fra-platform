import { createSlice, Reducer } from '@reduxjs/toolkit'
import { UserState } from './stateType'
import { initApp } from '../assessment/actions/initApp'
import { logout } from './actions'

const initialState: UserState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => initialState)
    builder.addCase(initApp.fulfilled, (_, { payload }) => payload.user)
  },
})

export const UserActions = {
  ...userSlice.actions,
  logout,
}

export default userSlice.reducer as Reducer<UserState>
