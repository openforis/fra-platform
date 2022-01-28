import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const createResetPassword: any = createAsyncThunk('login/post/createResetPassword', async (email: string) => {
  const { data } = await axios.post(ApiEndPoint.Auth.ResetPassword.one(), { email })
  return data
})
