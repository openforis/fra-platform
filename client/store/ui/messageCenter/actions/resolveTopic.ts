import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'

type Params = {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  key: string
}

export const resolveTopic = createAsyncThunk<void, Params>(
  'messageCenter/topic/resolve',
  async ({ countryIso, assessmentName, cycleName, key }) => {
    const params = { countryIso, assessmentName, cycleName, key }
    await axios.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), {}, { params })
  }
)
