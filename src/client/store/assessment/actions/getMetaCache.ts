import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { AssessmentMetaCache, AssessmentMetaCaches, AssessmentName, CycleName } from 'meta/assessment'

import { AssessmentSelectors } from 'client/store/assessment/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = AssessmentMetaCache | undefined

export const getMetaCache = createAsyncThunk<Returned, Props, ThunkApiConfig>(
  'assessment/metaCache/get',
  async (props, { getState }) => {
    const { assessmentName, cycleName } = props

    const assessment = AssessmentSelectors.getAssessment(getState(), assessmentName)
    const cycle = assessment.cycles.find((c) => c.name === cycleName)

    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      const params = { assessmentName, cycleName, countryIso: Global.WO }
      const { data } = await axios.get(ApiEndPoint.MetaData.metaCache(), { params })
      return data
    }

    return undefined
  }
)
