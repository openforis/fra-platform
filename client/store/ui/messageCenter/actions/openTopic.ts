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
  title: string
  subtitle: string
  type: MessageTopicType
  section?: string
}

export const openTopic = createAsyncThunk<MessageTopic, Params>(
  'messageCenter/topic/open',
  async ({ countryIso, assessmentName, cycleName, key, title, subtitle, type, section }) => {
    const params = { countryIso, assessmentName, cycleName, key, type, section }
    const { data } = await axios.get(ApiEndPoint.MessageCenter.Topic.get(), { params })
    return { ...data, type, title, subtitle, key, messages: data?.messages || [] }
  }
)
