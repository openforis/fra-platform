import { createAsyncThunk } from '@reduxjs/toolkit'
import * as H from 'history'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const createResetPassword = createAsyncThunk(
  'login/post/createResetPassword',
  async ({ email, history }: { email: string; history: H.History<H.LocationState> }) => {
    const { data } = await axios.post(ApiEndPoint.Auth.ResetPassword.one(), { email })
    if (data?.message) history.push(BasePaths.Root())
    return data
  }
)
