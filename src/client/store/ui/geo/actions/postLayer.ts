import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { LayerKey, LayerSectionKey, LayerSource } from '@meta/geo'

export type PostLayerRequestBody = { countryIso: CountryIso } & LayerSource

export interface PostLayerProps {
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  uri: string
  body: PostLayerRequestBody
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
