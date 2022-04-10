import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { Country, CountryIso } from '@meta/area'

export const getCountry = createAsyncThunk<
  Country,
  { countryIso: CountryIso; assessmentName: string; cycleName: string }
>('assessment/get/country', async ({ countryIso, assessmentName, cycleName }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.country(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
    },
  })
  return data
})
