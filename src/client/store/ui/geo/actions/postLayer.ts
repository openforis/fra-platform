import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerKey, LayerSectionKey, LayerSource, sectionsApiEndpoint } from 'meta/geo'

import { ThunkApiConfig } from 'client/store/types'

import { _getLayerRequestBody } from '.'

type Props = {
  countryIso: CountryIso
  layerKey: LayerKey
  layerSource?: LayerSource
  sectionKey: LayerSectionKey
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], Props, ThunkApiConfig>(
  'geo/post/layer',
  async (props, { getState }) => {
    const { countryIso, layerKey, layerSource, sectionKey } = props
    const url = sectionsApiEndpoint[sectionKey]

    if (layerSource !== undefined) {
      const body = { countryIso, layer: layerSource }
      const response = await axios.post(url, body)
      return [sectionKey, layerKey, response.data.mapId]
    }

    const state = getState()
    const sectionState = state.geo.sections?.[sectionKey]
    const layerState = sectionState?.[layerKey]
    const body = _getLayerRequestBody(countryIso, layerKey, layerState, sectionState)
    const response = await axios.post(url, body)
    return [sectionKey, layerKey, response.data.mapId]
  }
)
