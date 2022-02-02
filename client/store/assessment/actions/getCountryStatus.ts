import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { CountryStatus } from '@meta/assessment'

export const getCountryStatus = createAsyncThunk<
  CountryStatus,
  { countryIso: CountryIso; name: string; cycleName: string }
>('assessment/get/country/status', async ({ countryIso, name, cycleName }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.countryStatus(countryIso, name, cycleName))
  return data
})
