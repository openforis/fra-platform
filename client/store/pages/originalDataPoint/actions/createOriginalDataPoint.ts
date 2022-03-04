import { createAsyncThunk } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { AssessmentName, OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'
import { BasePaths } from '@client/basePaths'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { assessmentName: AssessmentName; cycleName: string; countryIso: CountryIso; history: RouteComponentProps['history'] }
>('originalDataPoint/post', async ({ assessmentName, cycleName, countryIso, history }) => {
  const originalDataPoint = { countryIso } as OriginalDataPoint
  const { data } = await axios.post(ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName), {
    originalDataPoint,
  })
  if (data?.id) {
    history.push(BasePaths.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName, String(data.id)))
  }
  return data
})
