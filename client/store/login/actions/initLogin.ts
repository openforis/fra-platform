import { createAsyncThunk } from '@reduxjs/toolkit'

export const initLogin = createAsyncThunk('login/init', async (_) => {
  const defaultUser = { type: 'google', email: '', password: '' }

  return { user: defaultUser }
})
