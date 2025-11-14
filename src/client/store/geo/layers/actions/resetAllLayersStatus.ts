import { createAsyncThunk } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer/key'

import { resetLayerStatus } from 'client/store/geo/layers/actions/resetLayerStatus'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

export const resetAllLayersStatus = createAsyncThunk<void, void, ThunkApiConfig>(
  'geo/layers/resetAllLayersStatus',
  async (_, { dispatch, getState }) => {
    const state = LayersSelectors.getLayers(getState())
    Object.keys(state).forEach((key) => {
      dispatch(resetLayerStatus({ layerKey: key as LayerKey }))
    })
  }
)
