import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODP, ODPs } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'

import { setODP } from '../../../../store/page/originalDataPoint/actions/setODP'

export const fetchODP = createAsyncThunk<void, { id: string }>(
  'originalDataPoint/fetch',
  async ({ id }, { dispatch }) => {
    const {
      data: { odp },
    } = await axios.get<undefined, AxiosResponse<{ odp: ODP }>>(ApiEndPoint.OriginalDataPoint.one(id))

    dispatch(setODP(ODPs.addNationalClassPlaceHolder(odp)))
  }
)
