import { createAsyncThunk } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer'

import { ThunkApiConfig } from 'client/store/types'

type Params = {
  layerKey: LayerKey
  opacity: number
}

type Returned = Params

export const setOpacity = createAsyncThunk<Returned, Params, ThunkApiConfig>(
  'geo/layers/setOpacity',
  async (params) => {
    return params
  }
)
