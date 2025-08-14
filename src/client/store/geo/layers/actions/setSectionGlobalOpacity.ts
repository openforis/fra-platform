import { createAsyncThunk } from '@reduxjs/toolkit'

import { Layer } from 'meta/geo/layer'

import { LayersActions } from 'client/store/geo/layers/actions'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  layers: Array<Layer>
  opacity: number
}

export const setSectionGlobalOpacity = createAsyncThunk<void, Params, ThunkApiConfig>(
  'geo/layers/setSectionGlobalOpacity',
  async (params, { dispatch, getState }) => {
    const { layers, opacity } = params
    const state = getState()
    layers.forEach((layer) => {
      const layerState = LayersSelectors.getLayer(state, layer.key)
      if (layerState?.selected) dispatch(LayersActions.setOpacity({ layerKey: layer.key, opacity }))
    })
  }
)
