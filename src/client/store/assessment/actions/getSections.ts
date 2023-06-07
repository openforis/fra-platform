import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Section } from 'meta/assessment'

export const getSections = createAsyncThunk<
  Array<Section>,
  { assessmentName: string; cycleName: string; countryIso?: string }
>('assessment/sections/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.MetaData.sections(), { params })
  return data
})
