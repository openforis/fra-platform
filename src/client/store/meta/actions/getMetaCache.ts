import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { MetadataSelectors } from 'client/store/meta/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  countryIso: AreaCode
  cycleName: CycleName
}

type Returned = AssessmentMetaCache | undefined

export const getMetaCache = createAsyncThunk<Returned, Props, ThunkApiConfig>(
  'meta/assessment/metaCache/get',
  async (props, { getState }) => {
    const { assessmentName, countryIso, cycleName } = props

    const state = getState()
    const assessment = MetadataSelectors.getAssessment(state, assessmentName)
    const cycle = assessment.cycles.find((c) => c.name === cycleName)

    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      const params = { assessmentName, cycleName, countryIso }
      const { data } = await axios.get(ApiEndPoint.MetaData.metaCache(), { params })
      return data
    }

    return undefined
  }
)
