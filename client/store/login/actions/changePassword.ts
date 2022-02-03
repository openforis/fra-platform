import { createAsyncThunk } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const changePassword = createAsyncThunk<
  { message?: string; error?: string },
  {
    email: string
    password: string
    resetPasswordUuid: string
    history: RouteComponentProps['history']
  }
>('login/post/changePassword', async ({ email, password, resetPasswordUuid, history }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), {
    email,
    password,
    uuid: resetPasswordUuid,
  })
  if (data?.message) history.push(BasePaths.Root())
  return data
})
