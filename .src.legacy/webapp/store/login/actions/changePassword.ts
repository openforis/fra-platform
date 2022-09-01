import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const changePassword = createAsyncThunk(
  'login/reset/changePassword',
  async ({ uuid, userId, password, password2 }) => {
    return axios
      .post(ApiEndPoint.Auth.changePassword(), { uuid, userId, password, password2 })
      .then((resp) => {
        const { message, error } = resp.data
        return { message, error }
      })
      .catch((error) => error)
  }
)
