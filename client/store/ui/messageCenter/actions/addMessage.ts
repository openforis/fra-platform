import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { MessageTopic, MessageTopicType } from '@meta/messageCenter'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  key: string
  message: string
  type: MessageTopicType
}

export const addMessage = createAsyncThunk<MessageTopic, Params>(
  'messageCenter/topicMessage/add',
  async ({ countryIso, assessmentName, cycleName, key, message, type }) => {
    const params = { countryIso, assessmentName, cycleName, key, type }
    await axios.post(ApiEndPoint.MessageCenter.Topic.addMessage(), { message }, { params })
    const { data } = await axios.get(ApiEndPoint.MessageCenter.Topic.get(), { params })
    return data
  }
)
