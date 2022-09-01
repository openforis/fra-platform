import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const findResetPassword = createAsyncThunk('login/reset/find', async (uuid) => {
  return axios
    .get(ApiEndPoint.Auth.ResetPassword.get(uuid))
    .then((resp) => {
      return {
        resetPassword: resp.data,
      }
    })
    .catch((error) => error)
})
