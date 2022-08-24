import { NavigateFunction } from 'react-router-dom'

import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { initApp } from '@client/store/assessment/actions/initApp'

export const localLogin = createAsyncThunk<
  void,
  {
    email: string
    password: string
    invitationUuid?: string
    navigate: NavigateFunction
  }
>('login/post/local', async ({ email, password, invitationUuid, navigate }, { dispatch }) => {
  const response = await axios.post(
    ApiEndPoint.Auth.login(),
    {
      email,
      password,
    },
    { params: { invitationUuid } }
  )

  if (response.status === 200) {
    dispatch(initApp())
    navigate('/')
  }
})
