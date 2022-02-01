import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const changePassword = createAsyncThunk(
  'login/post/changePassword',
  async ({ email, password, resetPasswordUuid }: any) => {
    const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), {
      email,
      password,
      uuid: resetPasswordUuid,
    })
    return data
  }
)
