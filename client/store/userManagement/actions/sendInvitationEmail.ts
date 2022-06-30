import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type Params = { invitationUuid: string }

export const sendInvitationEmail = createAsyncThunk<void, Params>(
  'usermanagement/post/sendInvitationEmail',
  async (params) => {
    await axios.get(ApiEndPoint.User.sendInvitationEmail(), { params })
  }
)
