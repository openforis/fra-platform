import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: string; cycleName: string; countryIso: CountryIso }
>('originalDataPoint/post', async ({ assessmentName, cycleName, countryIso }) => {
  const originalDataPoint = { countryIso } as OriginalDataPoint
  const { data } = await axios.post(ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, '-1'), {
    originalDataPoint,
  })
  return data
})
