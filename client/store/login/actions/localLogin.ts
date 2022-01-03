import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const localLogin = createAsyncThunk('login/local', async (user: { email: string; password: string }) => {
  await axios.post(ApiEndPoint.Auth.Login.local(), user)
})
