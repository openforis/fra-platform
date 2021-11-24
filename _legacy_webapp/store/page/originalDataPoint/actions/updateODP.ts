import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@core/utils'
import axios, { AxiosResponse } from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODP, ODPs } from '@core/odp'

import { setODP } from '../../../../store/page/originalDataPoint/actions/setODP'

const updateODPDebounced = Functions.debounce(async (odp: ODP) => {
  await axios.patch<unknown, AxiosResponse<{ odp: ODP }>>(
    ApiEndPoint.OriginalDataPoint.one(odp.id),
    ODPs.removeNationalClassPlaceHolder(odp)
  )
}, 250)

export const updateODP = createAsyncThunk<void, { odp: ODP }>(
  'originalDataPoint/updateDebounced',
  async ({ odp }, { dispatch }) => {
    dispatch(setODP(odp))
    updateODPDebounced(odp)
  }
)
