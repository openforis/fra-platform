import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { Country, RegionGroup } from '@meta/area'
import { Assessment } from '@meta/assessment'

export const initApp = createAsyncThunk<
  {
    assessment: Assessment
    countries: Array<Country>
    regionGroups: Record<string, RegionGroup>
  },
  void
>('assessment/get/init', async () => {
  const { data } = await axios.get(ApiEndPoint.Init.one())
  return data
})
