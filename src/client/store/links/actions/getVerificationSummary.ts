import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
}

export const getVerificationSummary = createAsyncThunk<LinksVerificationSummary, Props, ThunkApiConfig>(
  'links/verification/summary',
  async (props) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.Links.verifySummary(), { params: props })
    return data
  }
)
