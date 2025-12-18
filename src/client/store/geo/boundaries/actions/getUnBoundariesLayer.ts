import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Objects } from 'utils/objects'

import { BoundariesSelectors } from 'client/store/geo/boundaries/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Returned = {
  tileUrl: string
}

export const getUnBoundariesLayer = createAsyncThunk<Returned, void, ThunkApiConfig>(
  'geo/boundaries/getUnBoundariesLayer',
  async (_params, { getState }) => {
    const state = getState()
    const tileUrl = BoundariesSelectors.getTileUrl(state)
    if (!Objects.isNil(tileUrl)) return { tileUrl }

    const { data } = await axios.get(ApiEndPoint.Geo.Layers.unBoundaries())
    return { tileUrl: data.tileUrl }
  }
)
