import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'

export const deleteODP = createAsyncThunk<ODP, { id: string }>('originalDataPoint/delete', async ({ id }) => {
  await axios.delete<undefined, AxiosResponse<{ odp: ODP }>>(ApiEndPoint.OriginalDataPoint.one(id))
})
