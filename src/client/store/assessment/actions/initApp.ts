import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment } from 'meta/assessment'

export const initApp = createAsyncThunk<
  { assessment: Assessment },
  { assessmentName?: string; cycleName?: string } | void
>('assessment/init', async (params) => {
  const { data } = await axios.get(ApiEndPoint.init(), { params })
  return data
})
