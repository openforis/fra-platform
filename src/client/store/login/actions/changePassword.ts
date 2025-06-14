import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { UUIDs } from 'meta/uuid'

import { NotificationActions } from 'client/store/ui/notification/actions'
import { NotificationMessage } from 'client/store/ui/notification/state'

export const changePassword = createAsyncThunk<
  { message?: string; error?: string },
  {
    email: string
    password: string
    resetPasswordUuid: string
    navigate: NavigateFunction
  }
>('login/post/changePassword', async ({ email, navigate, password, resetPasswordUuid: uuid }, { dispatch }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), { email, password, uuid })

  if (data?.message) {
    dispatch(
      NotificationActions.addMessage({
        id: UUIDs.getUuid(),
        type: 'info',
        message: data.message,
      } as NotificationMessage)
    )

    navigate('/')
  }

  return data
})
