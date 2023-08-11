import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { AssessmentName, CycleName, Section } from 'meta/assessment'

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
