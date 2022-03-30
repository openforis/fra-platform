import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { MessageTopic } from '@meta/messageCenter'

export const openTopic = createAsyncThunk<
  MessageTopic,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; key: string; title: string }
>('messageCenter/topic/open', async ({ countryIso, assessmentName, cycleName, key, title }) => {
  const { data } = await axios.get(ApiEndPoint.MessageCenter.Topic.get(), {
    params: { countryIso, assessmentName, cycleName, key },
  })
  return {
    ...data,
    title,
    key,
    messages: data?.messages || [],
  }
})
