import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const changePassword = createAsyncThunk('login/reset/changePassword', async ({ email, password, uuid }: any) => {
  return axios
    .post(ApiEndPoint.Auth.changePassword(), { email, password, resetPasswordUuid: uuid })
    .then((resp) => {
      const { data } = resp
      return data
    })
    .catch((error) => error)
})
