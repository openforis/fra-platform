import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { ExtraEstimation, extraEstimationsApiEndpoint, extraEstimationsMetadata } from 'meta/geo/forestEstimations'
import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

// import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { LayersState } from 'client/store/geo/layers/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { GeoStatisticsSliceName } from 'client/store/geo/statistics/slice/name'
import { ThunkApiConfig } from 'client/store/types'

import { _getExtraEstimationRequestBody } from './_getExtraEstimationRequestBody'

type Params = {
  countryIso: CountryIso
  extraEstimation: ExtraEstimation
  scale: number
  sectionKey: LayerSectionKey
}

type Returned = {
  entry: ForestEstimationEntry
  extraEstimation: ExtraEstimation
  scale: number
  sectionKey: LayerSectionKey
}

export const getExtraEstimation = createAsyncThunk<Returned, Params, ThunkApiConfig & { rejectValue: string }>(
  'geo/statistics/getExtraEstimation',
  async (params, { getState, rejectWithValue }) => {
    const { countryIso, extraEstimation, scale, sectionKey } = params
    try {
      const url = extraEstimationsApiEndpoint[extraEstimation]

      const rootState = getState()
      // TODO: uncomment when layers PR is merged
      // const layersState = LayersSelectors.getLayers(rootState)
      const layersState = {} as LayersState

      const body = _getExtraEstimationRequestBody(countryIso, scale, layersState, sectionKey)
      const response = await axios.post(url, body)
      const area = response.data.areaHa

      const geoStatisticsState = rootState[GeoSliceName]?.[GeoStatisticsSliceName]
      const { fra1aLandArea = null } = geoStatisticsState?.forestEstimations?.data || {}
      const percentage = fra1aLandArea != null ? (area * 100) / (fra1aLandArea * 1000) : 0
      const sourceLabelKey = extraEstimationsMetadata[extraEstimation].titleKey
      const entry: ForestEstimationEntry = {
        area: Number(area.toFixed(2)),
        fra1ALandAreaPercentage: Number(percentage.toFixed(2)),
        sourceKey: extraEstimation,
        sourceLabelKey,
      }

      return { entry, extraEstimation, scale, sectionKey }
    } catch (error) {
      if (axios.isAxiosError(error)) return rejectWithValue('geo.error.extraEstimation.failedToRetrieve')
      return rejectWithValue('geo.error.extraEstimation.unexpectedDuringProcessing')
    }
  }
)
