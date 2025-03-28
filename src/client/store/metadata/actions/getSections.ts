import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = Array<Section>

export const getSections = createAsyncThunk<Returned, Props>('metadata/sections/get', async (props) => {
  const params = { ...props, countryIso: Global.WO }
  const { data } = await axios.get(ApiEndPoint.MetaData.sections(), { params })
  return data
})
