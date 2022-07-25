import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const updateUser = createAsyncThunk<void, FormData>('usermanagement/post/update', async (formData) => {
  await axios.put(ApiEndPoint.User.one(), formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
})
