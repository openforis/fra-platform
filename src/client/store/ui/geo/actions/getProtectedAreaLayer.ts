import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerSource } from 'meta/geo'

export interface GenericLayerConfig {
  countryIso: CountryIso
  layer?: LayerSource
  layers?: never[]
}

export type GetProtectedAreaLayerRequestBody = GenericLayerConfig

interface GetProtectedAreaLayerProps {
  key: string
  uri: string
  body: GetProtectedAreaLayerRequestBody
}

export const getProtectedAreaLayer = createAsyncThunk<[string, string], GetProtectedAreaLayerProps>(
  'geo/get/protectedAreaLayer',
  async ({ key, uri, body }) => {
    const {
      data: { mapId },
    } = await axios({ method: 'POST', url: uri, data: body })
    return [key, mapId]
  }
)
