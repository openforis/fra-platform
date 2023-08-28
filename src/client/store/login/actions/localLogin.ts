import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes'
import { User } from 'meta/user'

type Props = {
  email: string
  password: string
  invitationUuid?: string
  navigate: NavigateFunction
}

export const localLogin = createAsyncThunk<User | undefined, Props>('login/local', async (props) => {
  const { email, password, invitationUuid, navigate } = props

  const { status, data } = await axios.post(
    ApiEndPoint.Auth.login(),
    { email, password },
    { params: { invitationUuid } }
  )

  if (status === 200) {
    navigate(Routes.Root.path.absolute)
  }

  return data
})
