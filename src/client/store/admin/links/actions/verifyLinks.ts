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

export const verifyLinks = createAsyncThunk<void, Props, ThunkApiConfig>('links/verify', async (props) => {
  await axios.post(ApiEndPoint.Admin.Links.verify(), {}, { params: props })
})
