import { NavigateFunction } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createResetPassword = createAsyncThunk<
  { message?: string; error?: string },
  { email: string; navigate: NavigateFunction }
>('login/post/createResetPassword', async ({ email, navigate }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.resetPassword(), { email })
  if (data?.message) navigate('/')
  return data
})
