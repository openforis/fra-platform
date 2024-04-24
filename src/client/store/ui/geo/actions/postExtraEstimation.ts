import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { ExtraEstimation, extraEstimationsApiEndpoint, extraEstimationsMetadata } from 'meta/geo/forestEstimations'
import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

import { RootState } from 'client/store/RootState'

import { GeoActions } from '../slice'
import { LayersSectionState } from '../stateType'
import { _getExtraEstimationRequestBody } from './_getExtraEstimationRequestBody'

type Params = {
  countryIso: CountryIso
  extraEstimation: ExtraEstimation
  scale: number
  sectionKey: LayerSectionKey
}

export const postExtraEstimation = createAsyncThunk<[ExtraEstimation, LayerSectionKey, number], Params>(
  'geo/post/extraEstimation',
  async ({ countryIso, extraEstimation, scale, sectionKey }, { dispatch, getState, rejectWithValue }) => {
    try {
      const url = extraEstimationsApiEndpoint[extraEstimation]

      const state = getState()
      const sectionState = (state as RootState).geo.sections?.[sectionKey] ?? ({} as LayersSectionState)
      const body = _getExtraEstimationRequestBody(countryIso, scale, sectionState)

      const response = await axios.post(url, body)
      const area = response.data.areaHa

      const fra1ALandArea = (state as RootState).geo?.geoStatistics?.forestEstimations?.data?.fra1aLandArea ?? null
      const percentage = fra1ALandArea != null ? (area * 100) / (fra1ALandArea * 1000) : 0
      const sourceLabelKey = extraEstimationsMetadata[extraEstimation].titleKey
      const entry: ForestEstimationEntry = {
        area: Number(area.toFixed(2)),
        fra1ALandAreaPercentage: Number(percentage.toFixed(2)),
        sourceKey: extraEstimation,
        sourceLabelKey,
      }

      dispatch(GeoActions.insertTabularEstimationEntry([-1, entry]))
      return [extraEstimation, sectionKey, scale]
    } catch (error) {
      if (axios.isAxiosError(error)) return rejectWithValue('geo.error.extraEstimation.failedToRetrieve')

      return rejectWithValue('geo.error.extraEstimation.unexpectedDuringProcessing')
    }
  }
)
