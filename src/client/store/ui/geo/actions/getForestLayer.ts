import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface GetForestLayerProps {
  key: string
  uri: string
}

export const getForestLayer = createAsyncThunk<[string, string], GetForestLayerProps>(
  'geo/get/forestLayer',
  async ({ key, uri }) => {
    const {
      data: { mapId },
    } = await axios.get(uri)
    return [key, mapId]
  }
)
