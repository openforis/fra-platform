import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { MetadataSelectors } from 'client/store/meta/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = AssessmentMetaCache | undefined

export const getMetaCache = createAsyncThunk<Returned, Props, ThunkApiConfig>(
  'meta/assessment/metaCache/get',
  async (props, { getState }) => {
    const { assessmentName, cycleName } = props

    const state = getState()
    const assessment = MetadataSelectors.getAssessment(state, assessmentName)
    const cycle = Assessments.getCycle({ assessment, cycleName })

    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      const params = { assessmentName, cycleName }
      const { data } = await axios.get(ApiEndPoint.MetaData.metaCache(), { params })
      return data
    }

    return undefined
  }
)
