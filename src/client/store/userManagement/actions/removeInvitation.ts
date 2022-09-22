import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { RoleName, UserRole } from '@meta/user'

type Params = CycleParams & { invitationUuid: string }

export const removeInvitation = createAsyncThunk<UserRole<RoleName>, Params>(
  'userManagement/delete/invitation',
  async (params) => {
    const { data } = await axios.delete(ApiEndPoint.User.invitation(), { params })
    return data
  }
)
