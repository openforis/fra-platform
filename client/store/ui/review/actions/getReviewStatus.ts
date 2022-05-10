import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { ReviewStatus } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
}

export const getReviewStatus = createAsyncThunk<Array<ReviewStatus>, Params>(
  'review/get',
  async ({ countryIso, assessmentName, cycleName }) => {
    const params = { countryIso, assessmentName, cycleName }
    const { data } = await axios.get(ApiEndPoint.Assessment.review(), { params })
    return data
  }
)
