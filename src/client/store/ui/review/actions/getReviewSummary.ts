import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { ReviewSummary } from 'meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
}

export const getReviewSummary = createAsyncThunk<Array<ReviewSummary>, Params>('review/summary/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Review.summary(), { params })
  return data
})
