import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const changePassword = createAsyncThunk(
  'login/post/changePassword',
  async ({ email, password, resetPasswordUuid, history }: any) => {
    const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), {
      email,
      password,
      uuid: resetPasswordUuid,
    })
    if (data?.message) history.push(BasePaths.Root())
    return data
  }
)
