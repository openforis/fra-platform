import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { LayerKey, LayerSource } from 'meta/geo/layer'

import { RootState } from 'client/store/RootState'
import { GeoActions } from 'client/store/ui/geo/slice'

type Params = {
  fetchLayerParams?: {
    countryIso: CountryIso
    layerSource?: LayerSource
  }
  layerKey: LayerKey
  sectionKey: LayerSectionKey
}

export const toggleLayer = createAsyncThunk<void, Params>(
  'geo/toggleLayer',
  async ({ layerKey, sectionKey, fetchLayerParams }, { dispatch, getState }) => {
    const state = getState()
    const layerState = (state as RootState).geo?.sections?.[sectionKey]?.[layerKey]

    const currentLayerSelected = layerState?.selected ?? false
    const currentMapId = layerState?.mapId

    // If the layer is now selected and doesn't have a mapId cached, fetch it
    if (!currentLayerSelected && !currentMapId && fetchLayerParams) {
      dispatch(
        GeoActions.postLayer({
          sectionKey,
          layerKey,
          countryIso: fetchLayerParams.countryIso,
          layerSource: fetchLayerParams.layerSource,
        })
      )
    }

    dispatch(GeoActions.setLayerSelected({ sectionKey, layerKey, selected: !currentLayerSelected }))
  }
)
