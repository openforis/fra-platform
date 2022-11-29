import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { UUIDs } from '@utils/uuids'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'

import { NotificationActions, NotificationMessage } from '@client/store/ui/notification'

export const createResetPassword = createAsyncThunk<
  { message?: string; error?: string },
  { email: string; navigate: NavigateFunction }
>('login/post/createResetPassword', async ({ email, navigate }, { dispatch }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.resetPassword(), { email })

  if (data?.message) {
    dispatch(
      NotificationActions.addMessage({
        id: UUIDs.v4(),
        type: 'success',
        message: data.message,
      } as NotificationMessage)
    )

    navigate('/')
  }

  return data
})
