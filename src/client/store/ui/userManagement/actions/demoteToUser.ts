import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { User } from '@meta/user'

export const demoteToUser = createAsyncThunk<User, { userId: number }>(
  'userManagement/post/demoteToUser',
  async ({ userId }) => {
    const { data } = await axios.post(ApiEndPoint.User.demote(), { userId })

    return data
  }
)
