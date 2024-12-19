import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user'

export const updateUserAdminRole = createAsyncThunk<User, { userUuid: User['uuid'] }>(
  'userManagement/post/updateUserAdminRole',
  async ({ userUuid }) => {
    const { data } = await axios.post(ApiEndPoint.User.adminRole(), { userUuid })

    return data
  }
)
