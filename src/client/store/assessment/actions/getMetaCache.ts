import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { AssessmentSelectors } from 'client/store/assessment/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: AreaCode
}

type Returned = AssessmentMetaCache | undefined

export const getMetaCache = createAsyncThunk<Returned, Props, ThunkApiConfig>(
  'assessment/metaCache/get',
  async (props, { getState }) => {
    const { assessmentName, countryIso, cycleName } = props

    const assessment = AssessmentSelectors.getAssessment(getState(), assessmentName)
    const cycle = assessment.cycles.find((c) => c.name === cycleName)

    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      const params = { assessmentName, cycleName, countryIso }
      const { data } = await axios.get(ApiEndPoint.MetaData.metaCache(), { params })
      return data
    }

    return undefined
  }
)
