import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'
import { setODPs } from '../../../../store/page/originalDataPoint/actions/setODPs'

export const fetchODPs = createAsyncThunk<void, { countryIso: string }>(
  'originalDataPoint/fetchMany',
  async ({ countryIso }, { dispatch }) => {
    const { data: odps } = await axios.get<undefined, AxiosResponse<Array<ODP>>>(
      `${ApiEndPoint.OriginalDataPoint.many()}?countryIso=${countryIso}`
    )

    dispatch(setODPs(odps))
  }
)
