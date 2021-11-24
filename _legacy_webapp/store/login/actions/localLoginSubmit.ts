import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const localLoginSubmit = createAsyncThunk('login/local/submit', async ({ user, invitationUUID }) => {
  return axios
    .post(ApiEndPoint.Auth.Login.local(), { invitationUUID, ...user })
    .then((resp) => {
      const { data } = resp
      if (data.redirectUrl) {
        window.location = data.redirectUrl
        return ''
      }
      if (data.message) {
        return data.message
      }
      return ''
    })
    .catch((error) => {
      return error
    })
})
