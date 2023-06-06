import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country, RegionGroup } from 'meta/area'

export const getAreas = createAsyncThunk<
  { countries: Array<Country>; regionGroups: Record<string, RegionGroup> },
  { assessmentName: string; cycleName?: string } | void
>('assessment/areas/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.Area.areas(), { params })
  return data
})
