import { createSlice, Reducer } from '@reduxjs/toolkit'
import { UserState } from '@webapp/store/user/userStateType'
import { AppActions } from '@webapp/store/app'
import { logout } from './actions'

const initialState: UserState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => initialState)
    builder.addCase(AppActions.initApp.fulfilled, (_, { payload }) => payload.userInfo)
    builder.addCase(AppActions.switchLanguage.fulfilled, (state, { payload }) => {
      if (state.lang) {
        state.lang = payload.language
      }
    })
  },
})

export const UserActions = {
  ...userSlice.actions,
  logout,
}

export default userSlice.reducer as Reducer<UserState>
