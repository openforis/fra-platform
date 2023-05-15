import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { LayerResponseData } from '@meta/api/request/geo/layer'
import { CountryIso } from '@meta/area'
import { LayerKey, LayerSectionKey, sectionsApiEndpoint } from '@meta/geo'

import { LayersSectionState, LayerState } from '../stateType'
import { _getLayerRequestBody } from '.'

export interface PostLayerProps {
  countryIso: CountryIso
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  layerState: LayerState
  sectionState?: LayersSectionState
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, LayerResponseData], PostLayerProps>(
  'geo/post/layer',
  async ({ countryIso, sectionKey, layerKey, layerState, sectionState }) => {
    const body = _getLayerRequestBody(countryIso, layerKey, layerState, sectionState)
    const url = sectionsApiEndpoint[sectionKey]
    const { data } = await axios({ method: 'POST', url, data: body })
    return [sectionKey, layerKey, data]
  }
)
