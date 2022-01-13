import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const initApp = createAsyncThunk('assessment/get/init', async () => {
  const { data } = await axios.get(ApiEndPoint.Init.one())
  return data
})
