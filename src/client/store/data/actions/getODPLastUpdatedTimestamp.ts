import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

type Params = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
  sectionName: string
}

type Response = {
  time?: string
}

type Returned = Params & Response

export const getODPLastUpdatedTimestamp = createAsyncThunk<Returned, Params>(
  'data/odp/lastUpdatedTimestamp/get',
  async (params) => {
    const config = { params }
    const { data } = await axios.get<Response>(ApiEndPoint.CycleData.OriginalDataPoint.lastUpdatedTimestamp(), config)

    return { ...params, time: data.time }
  }
)
