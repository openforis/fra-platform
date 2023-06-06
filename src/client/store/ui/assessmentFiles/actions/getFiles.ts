import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { AssessmentFile } from 'meta/assessment'

export const getFiles = createAsyncThunk<Array<AssessmentFile>, CycleParams>('assessment/files/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.File.Assessment.many(), { params })
  return data
})
