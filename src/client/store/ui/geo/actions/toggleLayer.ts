import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { CUSTOM_RECIPE_KEY, LayerKey, LayerSource } from 'meta/geo/layer'

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
    dispatch(GeoActions.setLayerSelected({ sectionKey, layerKey, selected: !currentLayerSelected }))
    dispatch(GeoActions.setLayerSectionRecipeName({ recipe: CUSTOM_RECIPE_KEY, sectionKey }))

    // If the layer is now selected, doesn't have a mapId cached and is visible, fetch it
    const currentMapId = layerState?.mapId
    if (currentLayerSelected || currentMapId) return
    if (layerState?.opacity === 0) return

    if (!fetchLayerParams) return
    dispatch(
      GeoActions.postLayer({
        sectionKey,
        layerKey,
        countryIso: fetchLayerParams.countryIso,
        layerSource: fetchLayerParams.layerSource,
      })
    )
  }
)
