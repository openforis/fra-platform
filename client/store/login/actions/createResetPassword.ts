import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const createResetPassword: any = createAsyncThunk(
  'login/post/createResetPassword',
  async (email: string, history: any) => {
    const { data } = await axios.post(ApiEndPoint.Auth.ResetPassword.one(), { email })
    if (data?.message) history.push(BasePaths.Root())
    return data
  }
)
