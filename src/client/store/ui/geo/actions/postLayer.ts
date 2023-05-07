import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { LayerRequestBody } from '@meta/api/request/geo/layer'
import { LayerKey, LayerSectionKey } from '@meta/geo'

export interface PostLayerProps {
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  uri: string
  body: LayerRequestBody
}

export const postLayer = createAsyncThunk<[LayerSectionKey, LayerKey, string], PostLayerProps>(
  'geo/post/layer',
  async ({ sectionKey, layerKey, uri, body }) => {
    const {
      data: { mapId },
    } = await axios({ method: 'POST', url: uri, data: body })
    return [sectionKey, layerKey, mapId]
  }
)
