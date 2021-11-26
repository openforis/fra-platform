import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const initApp = createAsyncThunk('app/init', async () => {
  try {
    return axios.get(ApiEndPoint.Init.one())
  } catch (err) {
    // if (err.response && err.response.status !== 401) {
    //   dispatch(applicationError(err))
    // }
    return {}
  }
})
