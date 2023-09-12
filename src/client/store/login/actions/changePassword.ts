import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { UUIDs } from 'utils/uuids'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

import { NotificationActions, NotificationMessage } from 'client/store/ui/notification'

export const changePassword = createAsyncThunk<
  { message?: string; error?: string },
  {
    email: string
    password: string
    resetPasswordUuid: string
    navigate: NavigateFunction
  }
>('login/post/changePassword', async ({ email, password, resetPasswordUuid: uuid, navigate }, { dispatch }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.changePassword(), { email, password, uuid })

  if (data?.message) {
    dispatch(
      NotificationActions.addMessage({
        id: UUIDs.v4(),
        type: 'info',
        message: data.message,
      } as NotificationMessage)
    )

    navigate('/')
  }

  return data
})
