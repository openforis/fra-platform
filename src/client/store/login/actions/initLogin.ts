import { createAsyncThunk } from '@reduxjs/toolkit'

export const initLogin = createAsyncThunk('login/init', async (_) => {
  return { type: 'google', email: '', password: '' }
})
