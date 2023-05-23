import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { LayerKey, LayerSectionKey, sectionsApiEndpoint } from '@meta/geo'

import { RootState } from '@client/store/RootState'

import { _getLayerRequestBody } from '.'

export interface PostLayerProps {
  countryIso: CountryIso
  sectionKey: LayerSectionKey
  layerKey: LayerKey
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], PostLayerProps>(
  'geo/post/layer',
  async ({ countryIso, sectionKey, layerKey }, { getState }) => {
    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const layerState = sectionState?.[layerKey]
    const body = _getLayerRequestBody(countryIso, layerKey, layerState, sectionState)
    const url = sectionsApiEndpoint[sectionKey]
    const {
      data: { mapId },
    } = await axios({ method: 'POST', url, data: body })
    return [sectionKey, layerKey, mapId]
  }
)