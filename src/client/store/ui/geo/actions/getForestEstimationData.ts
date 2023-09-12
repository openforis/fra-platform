import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ForestEstimations } from 'meta/geo'

interface GetForestEstimationDataProps {
  countryIso: string
  year: number
}

export const getForestEstimationData = createAsyncThunk<ForestEstimations, GetForestEstimationDataProps>(
  'geo/get/forestEstimations',
  async ({ countryIso, year }) => {
    const response = await axios.get(ApiEndPoint.Geo.Estimations.forest(), { params: { countryIso, year } })
    const fetchedForestEstimations: ForestEstimations = response.data
    return fetchedForestEstimations
  }
)
