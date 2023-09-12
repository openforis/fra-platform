import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

import { getUsers } from './getUsers'

type Params = CycleParams & {
  email: string
  name: string
  role: RoleName
  lang: Lang
}

export const inviteUser = createAsyncThunk<void, Params>(
  'userManagement/post/invitation',
  async (params, { dispatch }) => {
    const { status } = await axios.post(ApiEndPoint.User.invite(), null, { params })
    if (status === 200) {
      // Update list of users after inviting a new user
      dispatch(getUsers(params))
    }
  }
)
