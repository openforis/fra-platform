import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODP, ODPs } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'

export const fetchODP = createAsyncThunk<ODP, { id: string }>('originalDataPoint/fetch', async ({ id }) => {
  const {
    data: { odp },
  } = await axios.get<undefined, AxiosResponse<{ odp: ODP }>>(ApiEndPoint.OriginalDataPoint.one(id))

  return ODPs.addNationalClassPlaceHolder(odp)
})
