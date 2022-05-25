import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { MessageTopicType } from '@meta/messageCenter'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  key: string
  message: string
  type: MessageTopicType
  section?: string
}

export const postMessage = createAsyncThunk<void, Params>(
  'messageCenter/topicMessage/post',
  async ({ message, ...params }) => {
    await axios.post(ApiEndPoint.MessageCenter.Topic.getMessage(), { message }, { params })
  }
)
