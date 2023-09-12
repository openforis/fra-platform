import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerSource } from 'meta/geo'

export interface GenericLayerConfig {
  countryIso: CountryIso
  layer?: LayerSource
  layers?: never[]
}

export type GetBurnedAreaLayerRequestBody = GenericLayerConfig

interface GetBurnedAreaLayerProps {
  key: string
  uri: string
  body: GetBurnedAreaLayerRequestBody
}

export const getBurnedAreaLayer = createAsyncThunk<[string, string], GetBurnedAreaLayerProps>(
  'geo/get/burnedAreaLayer',
  async ({ key, uri, body }) => {
    const {
      data: { mapId },
    } = await axios({ method: 'POST', url: uri, data: body })
    return [key, mapId]
  }
)
