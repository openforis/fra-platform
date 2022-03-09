import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

export const getOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: string; cycleName: string; odpId: string }
>('originalDataPoint/get/byId', async ({ assessmentName, cycleName, odpId }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, odpId))
  return ODPs.addNationalClassPlaceHolder(data)
})
