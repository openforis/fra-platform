import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment } from 'meta/assessment/assessment'
import { User } from 'meta/user'

type Returned = {
  assessments: Array<Assessment>
  user?: User
}

export const initApp = createAsyncThunk<Returned>('application/init', async (params) => {
  const { data } = await axios.get(ApiEndPoint.init(), { params })
  return data
})
