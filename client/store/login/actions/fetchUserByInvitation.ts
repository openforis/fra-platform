import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const fetchUserByInvitation = createAsyncThunk('user/fetch/invitation', async (uuid: string) => {
  const { data } = await axios.get(ApiEndPoint.User.getByInvitation(uuid))
  return {
    userRole: data.userRole,
    assessment: data.assessment,
    user: data.user,
  }
})
