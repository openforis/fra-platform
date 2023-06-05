import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

export const fetchUserByInvitation = createAsyncThunk(
  'user/fetch/invitation',
  async (params: { invitationUuid: string }) => {
    const { data } = await axios.get(ApiEndPoint.User.invitation(), { params })
    return data
  }
)
