import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ForestEstimations } from 'meta/geo'

type Params = {
  countryIso: string
  year: number
}

export const getForestEstimations = createAsyncThunk<ForestEstimations, Params>(
  'geo/statistics/getForestEstimations',
  async (params) => {
    const response = await axios.get(ApiEndPoint.Geo.Estimations.forest(), { params })
    const fetchedForestEstimations: ForestEstimations = response.data
    return fetchedForestEstimations
  }
)
