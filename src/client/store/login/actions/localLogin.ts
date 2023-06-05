import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

import { initApp } from 'client/store/assessment/actions/initApp'

export const localLogin = createAsyncThunk<
  void,
  {
    email: string
    password: string
    invitationUuid?: string
    navigate: NavigateFunction
  }
>('login/post/local', async ({ email, password, invitationUuid, navigate }, { dispatch }) => {
  const { status } = await axios.post(ApiEndPoint.Auth.login(), { email, password }, { params: { invitationUuid } })

  if (status === 200) {
    dispatch(initApp()).then(() => {
      navigate('/')
    })
  }
})
