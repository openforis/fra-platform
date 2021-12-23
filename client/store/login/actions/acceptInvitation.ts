import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const acceptInvitation = createAsyncThunk('user/invitation/accept', async (uuid: string) => {
  const { data } = await axios.get(ApiEndPoint.User.acceptInvitation(uuid))
  return data.user
})
