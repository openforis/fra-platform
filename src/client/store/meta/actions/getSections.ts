import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: AreaCode
}

type Returned = Array<Section>

export const getSections = createAsyncThunk<Returned, Props>('metadata/sections/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.MetaData.sections(), { params })
  return data
})
