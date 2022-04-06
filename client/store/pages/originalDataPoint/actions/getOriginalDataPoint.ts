import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const getOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; odpId: string }
>('originalDataPoint/get/byId', async ({ countryIso, assessmentName, cycleName, odpId }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName, odpId)
  )
  return ODPs.addNationalClassPlaceHolder(data)
})
