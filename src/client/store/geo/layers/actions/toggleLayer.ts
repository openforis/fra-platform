import { createAsyncThunk } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer'

import { LayersActions } from 'client/store/geo/layers/actions'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  layerKey: LayerKey
}

export const toggleLayer = createAsyncThunk<void, Params, ThunkApiConfig>(
  'geo/layers/toggleLayer',
  async (params, { dispatch, getState }) => {
    const { layerKey } = params
    const state = getState()
    const layerState = LayersSelectors.getLayer(state, layerKey)
    const selected = layerState?.selected ?? false
    dispatch(LayersActions.setProperty({ layerKey, propertyKey: 'selected', value: !selected }))
  }
)
