import axios from 'axios'

import { applicationError } from '@webapp/../../../../client/components/error/actions'
import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const appUserLogout = 'app/user/logout'

export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  try {
    await axios.post(ApiEndPoint.Auth.logout())
    window.location.href = '/'
  } catch (err) {
    dispatch(applicationError(err))
  }
})
