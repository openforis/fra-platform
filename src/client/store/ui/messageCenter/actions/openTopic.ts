import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { MessageTopic, MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'

type Params = Omit<CycleDataParams, 'sectionName'> & {
  key: string
  title: string
  subtitle?: string
  type: MessageTopicType
  sectionName?: string
}

export const openTopic = createAsyncThunk<MessageTopic, Params>('messageCenter/topic/open', async (params) => {
  const { countryIso, key, title, subtitle, type } = params
  const { data } = await axios.get(ApiEndPoint.MessageCenter.topic(), { params })
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
