import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country, RegionGroup } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

type Params = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = { countries: Array<Country>; regionGroups: Record<string, RegionGroup> }

export const getAreas = createAsyncThunk<Returned, Params>('areas/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.Area.areas(), { params })

  return data
})
