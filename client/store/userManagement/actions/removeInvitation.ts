import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { RoleName, UserRole } from '@meta/user'

type Params = { invitationUuid: string }

export const removeInvitation = createAsyncThunk<UserRole<RoleName>, Params>(
  'usermanagement/post/removeInvitation',
  async (params) => {
    const { data } = await axios.delete(ApiEndPoint.User.removeInvitation(), { params })
    return data
  }
)
