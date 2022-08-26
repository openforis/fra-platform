import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserByInvitation = createAsyncThunk(
  'user/fetch/invitation',
  async (params: { invitationUuid: string }) => {
    const { data } = await axios.get(ApiEndPoint.User.invitation(), { params })
    return data
  }
)
