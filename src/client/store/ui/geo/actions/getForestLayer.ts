import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ForestSource } from '@meta/geo'

interface GetForesLayerProps {
  mapLayerKey: ForestSource
  uri: string
}

export const getForestLayer = createAsyncThunk<[ForestSource, string], GetForesLayerProps>(
  'geo/get/forestLayer',
  async ({ mapLayerKey, uri }) => {
    const {
      data: { mapId },
    } = await axios.get(uri)
    return [mapLayerKey, mapId]
  }
)
