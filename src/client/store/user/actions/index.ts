import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'

export const logout = createAsyncThunk('user/post/logout', async () => {
  const { status } = await axios.post(ApiEndPoint.Auth.logout())
  if (status === 200) {
    // Clear localStorage on successful logout
    localStorage.removeItem('jwtToken')
  }
})
