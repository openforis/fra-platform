import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const createResetPassword = createAsyncThunk('login/local/reset', async (email: string) => {
  return axios
    .post(ApiEndPoint.Auth.ResetPassword.create(), { email })
    .then((resp) => {
      const { data } = resp
      return data
    })
    .catch((error) => error)
})
