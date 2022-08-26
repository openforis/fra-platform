import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const acceptInvitation = createAsyncThunk(
  'user/invitation/accept',
  async (params: { invitationUuid: string }) => {
    const { data } = await axios.get(ApiEndPoint.User.invitationAccept(), {
      params,
    })
    return data.user
  }
)
