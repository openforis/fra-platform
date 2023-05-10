import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { LayerKey, LayerSectionKey, sectionsApiEndpoint } from '@meta/geo'

import { LayerState } from '../stateType'
import { _getLayerRequestBody } from '.'

export interface PostLayerProps {
  countryIso: CountryIso
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  layerState: LayerState
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], PostLayerProps>(
  'geo/post/layer',
  async ({ countryIso, sectionKey, layerKey, layerState }) => {
    const body = _getLayerRequestBody(countryIso, layerKey, layerState)
    const url = sectionsApiEndpoint[sectionKey]
    const {
      data: { mapId },
    } = await axios({ method: 'POST', url, data: body })
    return [sectionKey, layerKey, mapId]
  }
)
