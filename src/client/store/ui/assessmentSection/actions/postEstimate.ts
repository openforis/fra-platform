import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleDataParams, EstimateBody } from '@meta/api/request'
import { TableData } from '@meta/data'

export const postEstimate = createAsyncThunk<TableData, CycleDataParams & EstimateBody>(
  'section/post/estimate',
  async ({ fields, method, tableName, ...params }) => {
    const { data } = await axios.post(ApiEndPoint.CycleData.Table.estimate(), { fields, method, tableName }, { params })
    return data
  }
)
