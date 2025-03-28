import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export const getIsVerificationInProgress = createAsyncThunk<boolean, Props, ThunkApiConfig>(
  'links/verification/status',
  async (props) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.Links.verifyStatus(), { params: props })
    return data
  }
)
