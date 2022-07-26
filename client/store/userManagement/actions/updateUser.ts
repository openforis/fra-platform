import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { User } from '@meta/user'

type Params = {
  user: User
}

export const updateUser = createAsyncThunk<void, Params>('usermanagement/post/update', async (params) => {
  const { user } = params

  const formData = new FormData()
  formData.append('user', JSON.stringify(user))

  await axios.put(ApiEndPoint.User.one(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
})
