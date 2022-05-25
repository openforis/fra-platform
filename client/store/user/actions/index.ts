import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const logout = createAsyncThunk('user/post/logout', async () => {
  await axios.post(ApiEndPoint.Auth.logout())
})
