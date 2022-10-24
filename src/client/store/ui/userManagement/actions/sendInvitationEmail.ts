import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'

type Params = { invitationUuid: string }

export const sendInvitationEmail = createAsyncThunk<void, Params>(
  'userManagement/post/sendInvitationEmail',
  async (params) => {
    await axios.get(ApiEndPoint.User.invitationSendEmail(), { params })
  }
)
