import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { Section } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const getSections = createAsyncThunk<
  Array<Section>,
  { countryIso: CountryIso; name: string; cycleName: string }
>('assessment/get/sections', async ({ countryIso, name, cycleName }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.sections(countryIso, name, cycleName))
  return data
})
