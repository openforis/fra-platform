import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { AssessmentMetaCache, AssessmentName, CycleName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = {
  metaCache: AssessmentMetaCache
}

export const getMetaCache = createAsyncThunk<Returned, Props>('assessment/metaCache/get', async (props) => {
  const params = { ...props, countryIso: Global.WO }
  const { data: metaCache } = await axios.get(ApiEndPoint.MetaData.metaCache(), { params })
  return { metaCache }
})
