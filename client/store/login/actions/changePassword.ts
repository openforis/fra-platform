import { NavigateFunction } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const changePassword = createAsyncThunk<
  { message?: string; error?: string },
  {
    email: string
    password: string
    resetPasswordUuid: string
    navigate: NavigateFunction
  }
>('login/post/changePassword', async ({ email, password, resetPasswordUuid, navigate }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), {
    email,
    password,
    uuid: resetPasswordUuid,
  })
  if (data?.message) navigate('/')
  return data
})
