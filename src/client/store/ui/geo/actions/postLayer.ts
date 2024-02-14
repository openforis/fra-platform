import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerKey, LayerSectionKey, LayerSource, sectionsApiEndpoint } from 'meta/geo'

import { RootState } from 'client/store/RootState'

import { _getLayerRequestBody } from '.'

type Params = {
  countryIso: CountryIso
  layerKey: LayerKey
  layerSource?: LayerSource
  sectionKey: LayerSectionKey
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], Params>(
  'geo/post/layer',
  async ({ countryIso, layerKey, layerSource, sectionKey }, { getState }) => {
    const url = sectionsApiEndpoint[sectionKey]

    if (layerSource !== undefined) {
      const body = {
        countryIso,
        layer: layerSource,
      }
      const response = await axios.post(url, body)
      return [sectionKey, layerKey, response.data.mapId]
    }

    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const layerState = sectionState?.[layerKey]
    const body = _getLayerRequestBody(countryIso, layerKey, layerState, sectionState)
    const response = await axios.post(url, body)
    return [sectionKey, layerKey, response.data.mapId]
  }
)
