import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@core/country'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ReviewSummary } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
}

export const getReviewSummary = createAsyncThunk<Array<ReviewSummary>, Params>(
  'review/summary/get',
  async ({ countryIso, assessmentName, cycleName }) => {
    const params = { countryIso, assessmentName, cycleName }
    const { data } = await axios.get(ApiEndPoint.Review.summary.many(), { params })
    return data
  }
)
