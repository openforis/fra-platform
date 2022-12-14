import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { User } from '@meta/user'

export const promoteToAdmin = createAsyncThunk<User, { userId: number }>(
  'userManagement/post/promoteToAdmin',
  async ({ userId }) => {
    const { data } = await axios.post(ApiEndPoint.User.promote(), { userId })

    return data
  }
)
