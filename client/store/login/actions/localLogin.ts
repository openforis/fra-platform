import { createAsyncThunk } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const localLogin = createAsyncThunk<
  void,
  {
    email: string
    password: string
    invitationUuid?: string
    history: RouteComponentProps['history']
  }
>('login/local', async ({ email, password, invitationUuid, history }) => {
  await axios.post(`${ApiEndPoint.Auth.Login.local()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`, {
    email,
    password,
  })
  history.push(BasePaths.Root())
})
