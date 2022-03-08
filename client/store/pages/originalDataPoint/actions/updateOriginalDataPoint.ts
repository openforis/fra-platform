import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

export const updateOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: string; cycleName: string; originalDataPoint: OriginalDataPoint }
>('originalDataPoint/put/byId', async ({ assessmentName, cycleName, originalDataPoint }) => {
  const { data } = await axios.patch(
    ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, String(originalDataPoint.id)),
    {
      originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
    }
  )
  return ODPs.addNationalClassPlaceHolder(data)
})
