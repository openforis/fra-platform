import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const localLogin = createAsyncThunk<
  void,
  {
    email: string
    password: string
    invitationUuid?: string
  }
>('login/local', async ({ email, password, invitationUuid }) => {
  await axios.post(`${ApiEndPoint.Auth.Login.local()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`, {
    email,
    password,
  })
  window.location.reload()
})
