import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPoint } from '@meta/assessment'
import { addNationalClassPlaceHolder } from '@core/odp/odps/addNationalClassPlaceHolder'
import { removeNationalClassPlaceHolder } from '@core/odp/odps/removeNationalClassPlaceHolder'

export const updateOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: string; cycleName: string; odpId: string; originalDataPoint: OriginalDataPoint }
>('originalDataPoint/put/byId', async ({ assessmentName, cycleName, odpId, originalDataPoint }) => {
  const { data } = await axios.put(ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, odpId), {
    originalDataPoint: removeNationalClassPlaceHolder(originalDataPoint),
  })
  return addNationalClassPlaceHolder(data)
})
