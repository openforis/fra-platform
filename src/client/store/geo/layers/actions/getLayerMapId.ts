import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { Layer, LayerKey, LayerSectionKey, LayerSource, sectionsApiEndpoint } from 'meta/geo'

import { _getLayerRequestBody } from 'client/store/geo/layers/actions/_getLayerRequestBody'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { LayersSliceName } from 'client/store/geo/layers/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  countryIso: CountryIso
  layerKey: LayerKey
  layerSource?: LayerSource
  sectionKey: LayerSectionKey
  sectionLayers: Array<Layer>
}

type Returned = {
  layerKey: LayerKey
  mapId: string
  sectionKey: LayerSectionKey
}

export const getLayerMapId = createAsyncThunk<Returned, Params, ThunkApiConfig>(
  'geo/layers/getLayerMapId',
  async (params, { getState }) => {
    const { countryIso, layerKey, layerSource, sectionKey, sectionLayers } = params
    const url = sectionsApiEndpoint[sectionKey]

    if (layerSource !== undefined) {
      const body = { countryIso, layer: layerSource }
      const response = await axios.post(url, body)
      return { layerKey, mapId: response.data.mapId, sectionKey }
    }

    const rootState = getState()
    const layersState = rootState[GeoSliceName]?.[LayersSliceName]

    const layerState = LayersSelectors.getLayer(rootState, layerKey)

    const body = _getLayerRequestBody(countryIso, layerKey, layerState, layersState, sectionLayers)
    const response = await axios.post(url, body)
    return { layerKey, mapId: response.data.mapId, sectionKey }
  }
)
