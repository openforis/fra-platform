import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams, EstimateBody } from '@meta/api/request'
import { RecordAssessmentData } from '@meta/data'

export const postEstimate = createAsyncThunk<RecordAssessmentData, CycleDataParams & EstimateBody>(
  'section/post/estimate',
  async ({ fields, method, tableName, ...params }) => {
    const { data } = await axios.post(ApiEndPoint.CycleData.Table.estimate(), { fields, method, tableName }, { params })
    return data
  }
)
