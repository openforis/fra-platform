import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  section: string
  cycleName: string
  topicKey: string
  messageId: number
}

export const markMessageDeleted = createAsyncThunk<void, Params>(
  'messageCenter/topicMessage/markDeleted',
  async (params) => {
    await axios.delete(ApiEndPoint.MessageCenter.Topic.getMessage(), { params })
  }
)
