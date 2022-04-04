import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { MessageTopic } from '@meta/messageCenter'

export const addMessage = createAsyncThunk<
  MessageTopic,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; key: string; message: string }
>('messageCenter/topic/addMessage', async ({ countryIso, assessmentName, cycleName, key, message }) => {
  await axios.post(
    ApiEndPoint.MessageCenter.Topic.addMessage(),
    { message },
    {
      params: { countryIso, assessmentName, cycleName, key },
    }
  )
  const { data } = await axios.get(ApiEndPoint.MessageCenter.Topic.get(), {
    params: { countryIso, assessmentName, cycleName, key },
  })
  return data
})
