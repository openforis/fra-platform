import { createAsyncThunk } from '@reduxjs/toolkit'

import { LayerSectionKey } from 'meta/geo'
import { LayerKey } from 'meta/geo/layer'

import { RootState } from 'client/store/RootState'
import { GeoActions } from 'client/store/ui/geo/slice'

type Params = {
  layerKey: LayerKey
  sectionKey: LayerSectionKey
}

export const toggleLayer = createAsyncThunk<void, Params>(
  'geo/toggleLayer',
  async ({ sectionKey, layerKey }, { getState, dispatch }) => {
    const state = getState()
    const layerState = (state as RootState).geo?.sections?.[sectionKey]?.[layerKey]

    const currentLayerSelected = layerState?.selected ?? false
    dispatch(GeoActions.setLayerSelected({ sectionKey, layerKey, selected: !currentLayerSelected }))
  }
)
