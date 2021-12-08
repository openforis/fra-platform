import { createSlice, Reducer } from '@reduxjs/toolkit'
import { UserState } from './stateType'

const initialState: UserState = undefined

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // extraReducers: (builder) => { // TODO: Handle user login / load},
})

export const UserActions = {}

export default userSlice.reducer as Reducer<UserState>
