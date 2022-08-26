import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { RoleName, User } from '@meta/user'

type Params = CycleParams & {
  email: string
  name: string
  role: RoleName
}

export const inviteUser = createAsyncThunk<User, Params>('userManagement/post/invite', async (params) => {
  const { data } = await axios.post(ApiEndPoint.User.invite(), null, { params })
  return data
})
