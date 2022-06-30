import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { MessageTopic, MessageTopicStatus, MessageTopicType } from '@meta/messageCenter'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  key: string
  title: string
  subtitle?: string
  type: MessageTopicType
  section?: string
}

export const openTopic = createAsyncThunk<MessageTopic, Params>('messageCenter/topic/open', async (params) => {
  const { countryIso, key, title, subtitle, type } = params
  const { data } = await axios.get(ApiEndPoint.MessageCenter.Topic.get(), { params })
  return {
    ...data,
    countryIso,
    key,
    status: data?.status || MessageTopicStatus.opened,
    type,
    title,
    subtitle,
    messages: data?.messages || [],
  }
})
