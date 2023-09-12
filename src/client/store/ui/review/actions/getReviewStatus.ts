import { ApiEndPoint } from 'meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { ReviewStatus } from 'meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  sectionName: string
  odpId?: number
}

export const getReviewStatus = createAsyncThunk<Array<ReviewStatus>, Params>('review/status/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Review.status(), { params })
  return data
})
