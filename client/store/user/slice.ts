import { createSlice, Reducer } from '@reduxjs/toolkit'
import { UserState } from './stateType'
import { initApp } from '../assessment/actions/initApp'

const initialState: UserState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initApp.fulfilled, (_, { payload }) => payload.user)
  },
})

export const UserActions = {}

export default userSlice.reducer as Reducer<UserState>
