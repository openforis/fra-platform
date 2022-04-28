import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { MessageTopic } from '@meta/messageCenter'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  key: string
}

export const markTopicAsResolved = createAsyncThunk<MessageTopic, Params>(
  'messageCenter/topicMessage/markTopicAsResolved',
  async ({ countryIso, assessmentName, cycleName, key }) => {
    const params = { countryIso, assessmentName, cycleName, key }
    const { data } = await axios.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), {}, { params })
    return data
  }
)
