import { createAsyncThunk } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { LayerKey, LayerSectionKey, LayerSource } from 'meta/geo/layer'

import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  fetchLayerParams?: {
    countryIso: CountryIso
    layerSource?: LayerSource
  }
  layerKey: LayerKey
  sectionKey: LayerSectionKey
}

export const toggleLayer = createAsyncThunk<void, Params, ThunkApiConfig>(
  'geo/layers/toggleLayer',
  async (params, { dispatch, getState }) => {
    const { fetchLayerParams, layerKey, sectionKey } = params
    const state = getState()
    const layerState = LayersSelectors.getLayer(state, layerKey)
    const currentSelected = layerState?.selected ?? false
    dispatch(setProperty({ layerKey, propertyKey: 'selected', value: !currentSelected }))

    // If the layer is now selected, doesn't have a mapId cached and is visible, fetch it
    const currentMapId = layerState?.mapId
    if (currentSelected || currentMapId) return
    if (layerState?.opacity === 0) return

    if (Objects.isEmpty(fetchLayerParams)) return

    const { countryIso, layerSource } = fetchLayerParams
    dispatch(getLayerMapId({ countryIso, layerKey, layerSource, sectionKey }))
  }
)
