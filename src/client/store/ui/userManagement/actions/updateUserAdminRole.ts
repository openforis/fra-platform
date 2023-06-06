import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user'

export const updateUserAdminRole = createAsyncThunk<User, { userId: number }>(
  'userManagement/post/updateUserAdminRole',
  async ({ userId }) => {
    const { data } = await axios.post(ApiEndPoint.User.adminRole(), { userId })

    return data
  }
)
