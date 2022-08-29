import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@meta/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const getOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; year: string }
>('originalDataPoint/get/byYear', async ({ countryIso, assessmentName, cycleName, year }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName, year)
  )
  return ODPs.addNationalClassPlaceHolder(data)
})
