import { createAsyncThunk } from '@reduxjs/toolkit'
import * as H from 'history'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const changePassword = createAsyncThunk(
  'login/post/changePassword',
  async ({
    email,
    password,
    resetPasswordUuid,
    history,
  }: {
    email: string
    password: string
    resetPasswordUuid: string
    history: H.History<H.LocationState>
  }) => {
    const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), {
      email,
      password,
      uuid: resetPasswordUuid,
    })
    if (data?.message) history.push(BasePaths.Root())
    return data
  }
)
