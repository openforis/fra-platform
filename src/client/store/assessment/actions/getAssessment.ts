import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment } from 'meta/assessment'

export const getAssessment = createAsyncThunk<Assessment, { assessmentName?: string } | void>(
  'assessment/get',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.Assessment.one(), { params })
    return data
  }
)
