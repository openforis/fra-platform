import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ForestSource } from '@meta/geo'

interface Props {
  mapLayerKey: ForestSource
  uri: string
}

export const getForestLayer = createAsyncThunk<[ForestSource, string], Props>(
  'geo/get/forestLayer',
  async ({ mapLayerKey, uri }) => {
    const {
      data: { mapId },
    } = await axios.get(uri)
    return [mapLayerKey, mapId]
  }
)
