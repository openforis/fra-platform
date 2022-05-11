import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { ReviewStatus } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  section: string
  year?: string
}

export const getReviewStatus = createAsyncThunk<Array<ReviewStatus>, Params>(
  'review/get',
  async ({ countryIso, assessmentName, cycleName, section, year }) => {
    const params = { countryIso, assessmentName, cycleName, section, year }
    const { data } = await axios.get(ApiEndPoint.Review.status.many(), { params })
    return data
  }
)
