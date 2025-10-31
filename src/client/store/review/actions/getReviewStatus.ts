import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { ReviewStatus } from 'meta/assessment/review'

type Params = {
  assessmentName: string
  cycleName: string
  countryIso: CountryIso
  sectionName: string
  odpId?: number
}

export const getReviewStatus = createAsyncThunk<Array<ReviewStatus>, Params>('review/status/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Review.status(), { params })
  return data
})
