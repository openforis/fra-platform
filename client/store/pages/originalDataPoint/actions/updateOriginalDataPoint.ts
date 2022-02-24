import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

export const updateOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: string; cycleName: string; odpId: string; originalDataPoint: OriginalDataPoint }
>('originalDataPoint/put/byId', async ({ assessmentName, cycleName, odpId, originalDataPoint }) => {
  const { data } = await axios.put(ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, odpId), {
    originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
  })
  return ODPs.addNationalClassPlaceHolder(data)
})
