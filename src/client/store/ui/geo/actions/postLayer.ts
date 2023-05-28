import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { LayerKey, LayerSectionKey, LayerSource, sectionsApiEndpoint } from '@meta/geo'

import { RootState } from '@client/store/RootState'

import { _getLayerRequestBody } from '.'

export interface PostLayerProps {
  countryIso: CountryIso
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  layerSource?: LayerSource
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], PostLayerProps>(
  'geo/post/layer',
  async ({ countryIso, sectionKey, layerKey, layerSource }, { getState }) => {
    const url = sectionsApiEndpoint[sectionKey]
    let mapId = ''

    if (layerSource !== undefined) {
      const body = {
        countryIso,
        layer: layerSource,
      }
      const response = await axios.post(url, body)
      mapId = response.data.mapId
      return [sectionKey, layerKey, mapId]
    }
    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const layerState = sectionState?.[layerKey]
    const body = _getLayerRequestBody(countryIso, layerKey, layerState, sectionState)
    const response = await axios.post(url, body)
    mapId = response.data.mapId
    return [sectionKey, layerKey, mapId]
  }
)
