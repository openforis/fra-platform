import { createAsyncThunk } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'
import { initApp } from '@client/store/assessment/actions/initApp'

export const localLogin = createAsyncThunk<
  void,
  {
    email: string
    password: string
    invitationUuid?: string
    history: RouteComponentProps['history']
  }
>('login/post/local', async ({ email, password, invitationUuid, history }, { dispatch }) => {
  const response = await axios.post(
    ApiEndPoint.Auth.Login.local(),
    {
      email,
      password,
    },
    { params: { invitationUuid } }
  )

  if (response.status === 200) {
    dispatch(initApp())
    history.push(BasePaths.Root())
  }
})
