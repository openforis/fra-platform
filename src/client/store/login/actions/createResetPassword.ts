import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { UUIDs } from 'utils/uuids'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment'

import { NotificationActions, NotificationMessage } from 'client/store/ui/notification'

export const createResetPassword = createAsyncThunk<
  { message?: string; error?: string },
  { assessmentName: AssessmentName; cycleName: string; email: string; navigate: NavigateFunction }
>('login/post/createResetPassword', async ({ assessmentName, cycleName, email, navigate }, { dispatch }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.resetPassword(), { assessmentName, cycleName, email })

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
