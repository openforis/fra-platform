import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { Country, CountryIso } from '@meta/area'

export const updateCountry = createAsyncThunk<
  Country,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; country: Country }
>('assessment/post/country', async ({ country, countryIso, assessmentName, cycleName }) => {
  const { data } = await axios.post(
    ApiEndPoint.Assessment.country(),
    { country },
    {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    }
  )
  return data
})
