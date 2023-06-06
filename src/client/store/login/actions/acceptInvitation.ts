import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user'

export const acceptInvitation = createAsyncThunk<User, { invitationUuid: string }>('user/invitation/accept', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.invitationAccept(), {
    params,
  })
  return data.user
})
