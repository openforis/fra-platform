import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  section: string
  key: string
}

export const resolveTopic = createAsyncThunk<void, Params>('messageCenter/topic/resolve', async (params) => {
  await axios.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), {}, { params })
})
