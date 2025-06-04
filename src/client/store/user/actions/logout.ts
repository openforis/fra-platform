import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

export const logout = createAsyncThunk('user/post/logout', async () => {
  await axios.post(ApiEndPoint.Auth.logout())
})
