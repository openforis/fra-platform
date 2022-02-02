import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { CountryStatus } from '@meta/assessment'

export const postCountryStatus = createAsyncThunk<
  CountryStatus,
  {
    countryStatus: CountryStatus
    countryIso: CountryIso
    name: string
    cycleName: string
    message?: string
    notifyUsers?: boolean
  }
>('assessment/post/country/status', async ({ countryStatus, countryIso, name, cycleName, message, notifyUsers }) => {
  const { data } = await axios.post(
    ApiEndPoint.Assessment.countryStatus(countryIso, name, cycleName) + (notifyUsers ? '?notifyUsers=true' : ''),
    {
      countryStatus,
      message,
    }
  )
  return data
})
