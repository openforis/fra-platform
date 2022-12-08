import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Objects } from '@utils/objects'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ClientRoutes } from '@meta/app'

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
  const { data, status } = await axios.post(
    ApiEndPoint.Auth.login(),
    { email, password },
    { params: { invitationUuid } }
  )

  if (status === 200) {
    dispatch(initApp()).then(() => {
      let redirectUrl = '/'

      if (!Objects.isEmpty(data)) {
        redirectUrl = ClientRoutes.Assessment.Home.Root.getLink(data)
      }

      navigate(redirectUrl)
    })
  }
})
