import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName, CycleName } from 'meta/assessment'

import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export const verifyLinks = createAsyncThunk<void, Props, ThunkApiConfig>('links/verify', async (props) => {
  await axios.post(ApiEndPoint.CycleData.Links.verify(), {}, { params: props })
})
